# hospitality_leisure/hospitality_leisure/tasks.py

import frappe
from frappe.utils import today, add_days

def run_night_audit():
	"""Automated Night Audit for all properties"""
	properties = frappe.get_all("Property", filters={"is_active": 1})
	for prop in properties:
		audit = frappe.new_doc("Night Audit")
		audit.property = prop.name
		audit.audit_date = today()
		audit.insert()
		audit.submit()

def send_membership_expiry_alerts():
	"""Send alerts for memberships expiring in 7 days"""
	expiry_date = add_days(today(), 7)
	memberships = frappe.get_all("Gym Membership", 
		filters={"end_date": expiry_date, "status": "Active"})
	
	for member in memberships:
		# The notification fixture handles the actual email
		doc = frappe.get_doc("Gym Membership", member.name)
		doc.run_method("send_notification")

def send_arrival_reminders():
	"""Send arrival reminders for tomorrow's check-ins"""
	tomorrow = add_days(today(), 1)
	reservations = frappe.get_all("Reservation", 
		filters={"check_in_date": tomorrow, "status": "Confirmed"})
	
	for res in reservations:
		doc = frappe.get_doc("Reservation", res.name)
		doc.run_method("send_notification")

def update_room_availability_cache():
	"""Hourly task to sync room availability"""
	pass
