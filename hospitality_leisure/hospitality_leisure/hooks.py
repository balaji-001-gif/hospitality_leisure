# hospitality_leisure/hospitality_leisure/hooks.py

app_name = "hospitality_leisure"
app_title = "Hospitality Leisure"
app_publisher = "Your Organization"
app_description = "Complete Hospitality and Leisure ERP Solution"
app_email = "support@yourorg.com"
app_license = "mit"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/hospitality_leisure/css/hospitality_leisure.css"
# app_include_js = "/assets/hospitality_leisure/js/hospitality_leisure.js"

# include js, css files in header of web template
# web_include_css = "/assets/hospitality_leisure/css/hospitality_leisure.css"
# web_include_js = "/assets/hospitality_leisure/js/hospitality_leisure.js"

# include custom scss in every website theme (without sessions)
# website_theme_scss = "hospitality_leisure/public/scss/website_theme.scss"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_icons = {
# 	"hospitality_leisure": "public/icons/hospitality_leisure.svg"
# }

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "hospitality_leisure.utils.jinja_methods",
# 	"filters": "hospitality_leisure.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "hospitality_leisure.setup.install.before_install"
# after_install = "hospitality_leisure.setup.install.after_install"

# Uninstallation
# --------------

# before_uninstall = "hospitality_leisure.setup.uninstall.before_uninstall"
# after_uninstall = "hospitality_leisure.setup.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "hospitality_leisure.setup.install.before_app_install"
# after_app_install = "hospitality_leisure.setup.install.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "hospitality_leisure.setup.uninstall.before_app_uninstall"
# after_app_uninstall = "hospitality_leisure.setup.uninstall.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "hospitality_leisure.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in Python
# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
    "daily": [
        "hospitality_leisure.tasks.run_night_audit",
        "hospitality_leisure.tasks.send_membership_expiry_alerts",
        "hospitality_leisure.tasks.send_arrival_reminders",
        "hospitality_leisure.tasks.process_auto_renewals",
        "hospitality_leisure.tasks.send_flash_report",
    ],
    "hourly": [
        "hospitality_leisure.tasks.update_room_availability",
        "hospitality_leisure.tasks.check_ota_bookings",
        "hospitality_leisure.tasks.sync_channel_manager",
    ],
    "weekly": [
        "hospitality_leisure.tasks.send_weekly_revenue_report",
        "hospitality_leisure.tasks.archive_completed_events",
    ]
}

# Testing
# -------

# before_tests = "hospitality_leisure.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "hospitality_leisure.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "hospitality_leisure.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["hospitality_leisure.utils.before_request"]
# after_request = ["hospitality_leisure.utils.after_request"]

# Job Events
# ----------
# before_job = ["hospitality_leisure.utils.before_job"]
# after_job = ["hospitality_leisure.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_field}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_field}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and Authorization
# --------------------------------

# auth_hooks = [
# 	"hospitality_leisure.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }
