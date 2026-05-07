import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "guest", "label": _("Company/Guest"), "fieldtype": "Link", "options": "Guest Profile", "width": 150},
		{"fieldname": "balance", "label": _("Outstanding Amount"), "fieldtype": "Currency", "width": 120},
		{"fieldname": "status", "label": _("Status"), "fieldtype": "Data", "width": 100},
	]

def get_data(filters):
	return frappe.get_all("Guest Folio",
		filters={"folio_type": "City Ledger", "status": "Open"},
		fields=["guest", "balance", "status"]
	)
