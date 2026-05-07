# hospitality_leisure/hospitality_leisure/hospitality_setup/doctype/guest_profile/guest_profile.py

import frappe
from frappe.model.document import Document

class GuestProfile(Document):
	def get_full_name(self):
		return f"{self.first_name} {self.last_name or ''}".strip()

	def validate(self):
		if not self.email and not self.mobile:
			frappe.throw("Either Email or Mobile is required to create a Guest Profile")
