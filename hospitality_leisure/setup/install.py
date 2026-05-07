# hospitality_leisure/hospitality_leisure/setup/install.py

import frappe

def after_install():
	"""Setup initial data after app installation"""
	create_property_types()
	create_room_amenities()

def create_property_types():
	types = ["Hotel", "Resort", "Boutique Hotel", "Apartment Hotel"]
	for t in types:
		if not frappe.db.exists("Property Type", t):
			doc = frappe.new_doc("Property Type")
			doc.property_type = t
			doc.insert()

def create_room_amenities():
	amenities = ["WiFi", "Mini Bar", "TV", "Air Conditioning", "Safe"]
	for a in amenities:
		if not frappe.db.exists("Room Amenity", a):
			doc = frappe.new_doc("Room Amenity")
			doc.amenity_name = a
			doc.insert()
