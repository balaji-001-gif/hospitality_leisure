# hospitality_leisure/hospitality_leisure/hooks.py

app_name = "hospitality_leisure"
app_title = "Hospitality & Leisure ERP"
app_publisher = "Your Organization"
app_description = "Complete Hospitality & Leisure ERP for Frappe v15 / ERPNext v15"
app_email = "info@yourorg.com"
app_license = "MIT"
app_version = "1.0.0"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/hospitality_leisure/css/hospitality_leisure.css"
# app_include_js = "/assets/hospitality_leisure/js/hospitality_leisure.js"

# include js, css files in header of web template
# web_include_css = "/assets/hospitality_leisure/css/hospitality_leisure.css"
# web_include_js = "/assets/hospitality_leisure/js/hospitality_leisure.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "hospitality_leisure/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
	"Reservation": "public/js/reservation.js",
	"Food Order": "public/js/food_order.js",
	"Spa Appointment": "public/js/spa_appointment.js",
	"Gym Membership": "public/js/gym_membership.js",
	"Guest Folio": "public/js/guest_folio.js",
}

# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ---------
# app_include_icons = "hospitality_leisure/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "hospitality_leisure.utils.jinja_methods",
#	"filters": "hospitality_leisure.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "hospitality_leisure.install.before_install"
# after_install = "hospitality_leisure.setup.install.after_install"

# Uninstallation
# --------------

# before_uninstall = "hospitality_leisure.uninstall.before_uninstall"
# after_uninstall = "hospitality_leisure.uninstall.after_uninstall"

# Integration Setup
# ------------------
# tuple of (DocType, [list of filters]) of fixtures
fixtures = [
	"Property Type",
	"Rate Plan",
	"Room Amenity",
	{"dt": "Role", "filters": [["name", "like", "Hotel%"]]},
]

# Permissions
# -----------
# Permissions evaluated in Python
# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class Overrides
# -----------------------
# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# hook for override document methods

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
	"daily": [
		"hospitality_leisure.tasks.run_night_audit",
		"hospitality_leisure.tasks.send_membership_expiry_alerts",
		"hospitality_leisure.tasks.send_arrival_reminders",
	],
	"hourly": [
		"hospitality_leisure.tasks.update_room_availability_cache",
	],
}

# Testing
# -------

# before_tests = "hospitality_leisure.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "hospitality_leisure.event.get_events"
# }
#
# each method should be in the format 'link_to_method'

# Python HTTP SDK
# ----------------
# whitelisted_methods = {
#	"hospitality_leisure.api.check_availability": True,
# }
