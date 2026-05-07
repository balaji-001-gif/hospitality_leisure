import frappe
from frappe import _

def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data

def get_columns():
	return [
		{"fieldname": "therapist", "label": _("Therapist"), "fieldtype": "Link", "options": "Therapist", "width": 150},
		{"fieldname": "appointments", "label": _("Appointments"), "fieldtype": "Int", "width": 100},
		{"fieldname": "amount", "label": _("Revenue"), "fieldtype": "Currency", "width": 120},
	]

def get_data(filters):
	return frappe.db.sql("""
		SELECT therapist, count(name) as appointments, sum(amount) as amount
		FROM `tabSpa Appointment`
		WHERE docstatus = 1
		GROUP BY therapist
	""", as_dict=1)
