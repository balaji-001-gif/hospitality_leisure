# hospitality_leisure/hospitality_leisure/hotel/doctype/property/property.py

import frappe
from frappe.model.document import Document

class Property(Document):
	def validate(self):
		if self.check_in_time == self.check_out_time:
			frappe.throw("Check-in time and Check-out time cannot be the same")
