# hospitality_leisure/hospitality_leisure/hotel/doctype/reservation/reservation.py

import frappe
from frappe.model.document import Document
from frappe.utils import date_diff, getdate

class Reservation(Document):
	def validate(self):
		self.calculate_nights()
		self.validate_dates()
		self.calculate_total_amount()

	def calculate_nights(self):
		if self.check_in_date and self.check_out_date:
			self.nights = date_diff(self.check_out_date, self.check_in_date)
			if self.nights < 1:
				frappe.throw("Check-out date must be after check-in date")

	def validate_dates(self):
		if getdate(self.check_in_date) < getdate(frappe.utils.today()):
			if self.is_new():
				frappe.throw("Check-in date cannot be in the past")

	def calculate_total_amount(self):
		if self.room_rate and self.nights:
			self.total_amount = self.room_rate * self.nights

	def on_submit(self):
		if self.status == "Checked In":
			self.create_folio()

	def create_folio(self):
		if not self.guest_folio:
			folio = frappe.new_doc("Guest Folio")
			folio.reservation = self.name
			folio.guest = self.guest
			folio.property = self.property
			folio.check_in_date = self.check_in_date
			folio.check_out_date = self.check_out_date
			folio.insert()
			self.guest_folio = folio.name
			self.db_set("guest_folio", folio.name)
