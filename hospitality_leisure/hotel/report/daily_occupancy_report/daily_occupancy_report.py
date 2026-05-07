# hospitality_leisure/hospitality_leisure/hotel/report/daily_occupancy_report/daily_occupancy_report.py

import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "room_number", "label": _("Room"), "fieldtype": "Link", "options": "Room", "width": 100},
		{"fieldname": "room_type", "label": _("Room Type"), "fieldtype": "Link", "options": "Room Type", "width": 150},
		{"fieldname": "guest_name", "label": _("Guest"), "fieldtype": "Data", "width": 200},
		{"fieldname": "check_in_date", "label": _("Check-in"), "fieldtype": "Date", "width": 120},
		{"fieldname": "check_out_date", "label": _("Check-out"), "fieldtype": "Date", "width": 120},
		{"fieldname": "status", "label": _("Status"), "fieldtype": "Data", "width": 100},
	]

def get_data(filters):
	conditions = {}
	if filters.get("property"):
		conditions["property"] = filters.get("property")
	
	if filters.get("from_date") and filters.get("to_date"):
		conditions["check_in_date"] = [">=", filters.get("from_date")]
		conditions["check_out_date"] = ["<=", filters.get("to_date")]

	data = frappe.get_all("Reservation",
		filters=conditions,
		fields=["room as room_number", "room_type", "guest as guest_name", "check_in_date", "check_out_date", "status"]
	)
	return data
