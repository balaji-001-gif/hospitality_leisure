import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "name", "label": _("Booking Ref"), "fieldtype": "Link", "options": "Reservation", "width": 120},
		{"fieldname": "guest", "label": _("Guest"), "fieldtype": "Link", "options": "Guest Profile", "width": 150},
		{"fieldname": "room", "label": _("Room"), "fieldtype": "Link", "options": "Room", "width": 100},
		{"fieldname": "check_in_date", "label": _("ETA/ETD"), "fieldtype": "Date", "width": 110},
		{"fieldname": "nights", "label": _("Nights"), "fieldtype": "Int", "width": 80},
		{"fieldname": "status", "label": _("Status"), "fieldtype": "Data", "width": 100},
	]

def get_data(filters):
	return frappe.get_all("Reservation",
		filters={"check_in_date": filters.get("date") if filters else frappe.utils.today()},
		fields=["name", "guest", "room", "check_in_date", "nights", "status"]
	)
