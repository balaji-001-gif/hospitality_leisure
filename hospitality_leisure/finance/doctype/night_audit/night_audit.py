# hospitality_leisure/hospitality_leisure/finance/doctype/night_audit/night_audit.py

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import today, getdate, now

class NightAudit(Document):
	"""Night Audit — Automated daily hotel revenue processing"""

	def validate(self):
		if frappe.db.exists("Night Audit", {
			"property": self.property,
			"audit_date": self.audit_date,
			"name": ("!=", self.name)
		}):
			frappe.throw(_(f"Night Audit already exists for this property on {self.audit_date}"))

	def on_submit(self):
		"""Run automated audit procedures"""
		self.post_room_charges()
		self.calculate_occupancy()
		self.generate_revenue_summary()

	def post_room_charges(self):
		"""Post nightly room rate to all checked-in folios"""
		checked_in = frappe.get_all(
			"Reservation",
			filters={
				"property": self.property,
				"status": "Checked In",
				"check_in_date": ("<=", self.audit_date),
				"check_out_date": (">", self.audit_date),
			},
			fields=["name", "room", "total_amount", "nights"]
		)
		
		total_room_revenue = 0
		for res in checked_in:
			# Calculate one night's rate
			nightly_rate = res.total_amount / (res.nights or 1)
			
			# Find folio
			folio_name = frappe.db.get_value("Guest Folio", {"reservation": res.name}, "name")
			if folio_name:
				folio = frappe.get_doc("Guest Folio", folio_name)
				folio.append("charges", {
					"charge_date": self.audit_date,
					"charge_type": "Room Charge",
					"description": f"Night Audit - Room {res.room}",
					"amount": nightly_rate
				})
				folio.save(ignore_permissions=True)
				total_room_revenue += nightly_rate
		
		self.room_revenue = total_room_revenue
		self.total_rooms_occupied = len(checked_in)

	def calculate_occupancy(self):
		"""Calculate occupancy statistics"""
		total_rooms = frappe.db.count("Room", {"property": self.property})
		self.total_rooms_available = total_rooms
		if total_rooms > 0:
			self.occupancy_rate = (self.total_rooms_occupied / total_rooms) * 100
		else:
			self.occupancy_rate = 0

	def generate_revenue_summary(self):
		"""Compile revenue from other outlets"""
		# F&B Revenue from Food Orders
		fb_rev = frappe.db.sql("""
			SELECT SUM(total) FROM `tabFood Order`
			WHERE status != 'Cancelled' 
			AND creation LIKE %s
		""", (f"{self.audit_date}%",))[0][0] or 0
		
		self.fb_revenue = fb_rev
		self.total_revenue = self.room_revenue + self.fb_revenue + (self.other_revenue or 0)
