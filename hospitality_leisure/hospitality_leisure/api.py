# hospitality_leisure/hospitality_leisure/api.py

import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def check_availability(property, check_in, check_out, adults=1):
	"""Check room availability for online booking portal"""
	# Basic implementation: list available rooms by type
	rooms = frappe.get_all("Room", 
		filters={"property": property, "status": "Available"},
		fields=["name", "room_type", "floor"]
	)
	return rooms

@frappe.whitelist()
def run_checkin(reservation):
	"""Process guest check-in"""
	doc = frappe.get_doc("Reservation", reservation)
	if doc.status == "Confirmed":
		doc.status = "Checked In"
		doc.save()
		doc.submit()
		return {"message": "Guest checked in successfully", "folio": doc.guest_folio}
	else:
		frappe.throw("Reservation is not in 'Confirmed' status")
