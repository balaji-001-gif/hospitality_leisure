import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "department", "label": _("Department"), "fieldtype": "Data", "width": 150},
		{"fieldname": "actual", "label": _("Actual Revenue"), "fieldtype": "Currency", "width": 120},
		{"fieldname": "occupancy", "label": _("Occupancy %"), "fieldtype": "Percent", "width": 100},
	]

def get_data(filters):
	# Simplified mockup of flash report data aggregating from Night Audit
	audit = frappe.get_last_doc("Night Audit")
	if not audit:
		return []
		
	return [
		{"department": "Rooms", "actual": audit.room_revenue, "occupancy": audit.occupancy_rate},
		{"department": "Food & Beverage", "actual": audit.fb_revenue, "occupancy": 0},
		{"department": "Other", "actual": audit.other_revenue, "occupancy": 0},
		{"department": "Total", "actual": audit.total_revenue, "occupancy": audit.occupancy_rate},
	]
