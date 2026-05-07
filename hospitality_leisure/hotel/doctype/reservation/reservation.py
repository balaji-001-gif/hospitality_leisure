# hospitality_leisure/hospitality_leisure/hotel/doctype/reservation/reservation.py

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import date_diff, getdate, nowdate, add_days, now

class Reservation(Document):
	"""Hotel Reservation DocType Controller with full lifecycle management"""

	def validate(self):
		self.validate_dates()
		self.check_availability()
		self.calculate_nights()
		self.set_room_rate()
		self.calculate_total()

	def on_submit(self):
		"""Fire actions on booking confirmation"""
		self.update_room_status("Occupied" if self.status == "Checked In" else "Reserved")
		self.send_confirmation_notification()

	def on_cancel(self):
		"""Release room on cancellation"""
		self.update_room_status("Available")

	def validate_dates(self):
		if getdate(self.check_in_date) >= getdate(self.check_out_date):
			frappe.throw(_("Check-out date must be after Check-in date"))
		if getdate(self.check_in_date) < getdate(nowdate()):
			frappe.throw(_("Cannot create reservation in the past"))

	def check_availability(self):
		"""Check if room is available for the selected dates"""
		if not self.room: return
		
		conflicting = frappe.db.sql("""
			SELECT name FROM `tabReservation`
			WHERE room = %(room)s
			AND name != %(name)s
			AND status NOT IN ('Cancelled', 'No-Show')
			AND (
				(check_in_date <= %(check_in)s AND check_out_date > %(check_in)s)
				OR (check_in_date < %(check_out)s AND check_out_date >= %(check_out)s)
				OR (check_in_date >= %(check_in)s AND check_out_date <= %(check_out)s)
			)
		""", {
			"room": self.room,
			"name": self.name or "new",
			"check_in": self.check_in_date,
			"check_out": self.check_out_date
		})
		if conflicting:
			frappe.throw(_(f"Room {self.room} is not available for these dates. Conflict: {conflicting[0][0]}"))

	def calculate_nights(self):
		if self.check_in_date and self.check_out_date:
			self.nights = date_diff(self.check_out_date, self.check_in_date)

	def set_room_rate(self):
		"""Fetch rate if not manually set"""
		if not self.total_amount and self.room:
			# Mock rate fetch - in real ERPNext this would hit the Price List or Room Type rate
			rate = frappe.db.get_value("Room", self.room, "base_rate")
			if rate:
				self.total_amount = rate * (self.nights or 1)

	def calculate_total(self):
		# Additional logic for taxes/addons could go here
		pass

	@frappe.whitelist()
	def checkin(self):
		"""Process guest check-in"""
		if self.status != "Confirmed":
			frappe.throw(_("Only Confirmed reservations can be checked in"))
		
		self.status = "Checked In"
		self.save()
		
		# Create guest folio
		folio = frappe.new_doc("Guest Folio")
		folio.reservation = self.name
		folio.guest = self.guest
		folio.status = "Open"
		folio.insert()
		
		self.update_room_status("Occupied")
		return folio.name

	@frappe.whitelist()
	def checkout(self):
		"""Process guest checkout"""
		if self.status != "Checked In":
			frappe.throw(_("Guest must be Checked In to checkout"))
		
		self.status = "Checked Out"
		self.save()
		
		# Mark room as dirty for housekeeping
		self.update_room_status("Dirty")
		
		return _("Checked out successfully")

	def update_room_status(self, status):
		if self.room:
			frappe.db.set_value("Room", self.room, "status", status)

	def send_confirmation_notification(self):
		"""Trigger notification via Frappe Notification system"""
		pass
