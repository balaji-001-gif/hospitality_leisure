# hospitality_leisure/hospitality_leisure/restaurant/doctype/food_order/food_order.py

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now

class FoodOrder(Document):
	"""Restaurant Food Order Controller with KDS and Folio Integration"""

	def validate(self):
		self.calculate_total()

	def on_submit(self):
		"""Fire order to Kitchen Display System"""
		self.push_to_kds()
		if self.guest_folio:
			self.post_charge_to_folio()

	def calculate_total(self):
		total = 0
		for item in self.items:
			item.amount = (item.qty or 1) * (item.rate or 0)
			total += item.amount
		self.total = total

	def push_to_kds(self):
		"""Send order to Kitchen Display System via real-time notification"""
		frappe.publish_realtime(
			event="new_kds_order",
			message={
				"order": self.name,
				"table": self.table,
				"items": [{"item": i.menu_item, "qty": i.qty} for i in self.items],
				"notes": self.kitchen_notes,
			}
		)
		self.db_set("status", "Preparing")

	def post_charge_to_folio(self):
		"""Post F&B charge to Guest Folio"""
		folio = frappe.get_doc("Guest Folio", self.guest_folio)
		folio.append("charges", {
			"charge_date": frappe.utils.today(),
			"description": f"Restaurant Order: {self.name}",
			"amount": self.total
		})
		folio.save(ignore_permissions=True)

	@frappe.whitelist()
	def mark_ready(self):
		"""Kitchen marks order as ready"""
		self.status = "Ready"
		self.save()
		# Notify POS
		frappe.publish_realtime(
			event="order_ready",
			message={"order": self.name, "table": self.table}
		)
