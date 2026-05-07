import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "plan", "label": _("Plan Type"), "fieldtype": "Link", "options": "Membership Plan", "width": 150},
		{"fieldname": "active", "label": _("Active"), "fieldtype": "Int", "width": 100},
		{"fieldname": "revenue", "label": _("Monthly Revenue"), "fieldtype": "Currency", "width": 120},
	]

def get_data(filters):
	return frappe.db.sql("""
		SELECT plan, count(name) as active, sum(monthly_fee) as revenue
		FROM `tabGym Membership`
		WHERE status = 'Active'
		GROUP BY plan
	""", as_dict=1)
