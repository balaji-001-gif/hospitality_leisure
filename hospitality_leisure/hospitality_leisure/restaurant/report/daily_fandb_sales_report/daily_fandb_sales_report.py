import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "outlet", "label": _("Outlet"), "fieldtype": "Link", "options": "Restaurant Outlet", "width": 150},
		{"fieldname": "total", "label": _("Revenue"), "fieldtype": "Currency", "width": 120},
		{"fieldname": "status", "label": _("Status"), "fieldtype": "Data", "width": 100},
	]

def get_data(filters):
	return frappe.get_all("Food Order",
		fields=["outlet", "total", "status"]
	)
