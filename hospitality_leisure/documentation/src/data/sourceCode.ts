// Source code templates for HospitaLeisure ERP app files

export const RESERVATION_PY = `# hospitality_leisure/hotel/doctype/reservation/reservation.py
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import date_diff, getdate, nowdate, add_days
from hospitality_leisure.hotel.doctype.guest_folio.guest_folio import create_folio


class Reservation(Document):
    """Hotel Reservation DocType Controller"""

    def validate(self):
        self.validate_dates()
        self.check_availability()
        self.calculate_nights()
        self.calculate_total()
        self.set_room_rate()

    def before_submit(self):
        self.status = "Confirmed"

    def on_submit(self):
        self.send_confirmation_email()
        self.update_room_status("Reserved")

    def on_cancel(self):
        self.update_room_status("Available")
        self.create_cancellation_record()

    def validate_dates(self):
        if getdate(self.check_in_date) >= getdate(self.check_out_date):
            frappe.throw(_("Check-out date must be after Check-in date"))
        if getdate(self.check_in_date) < getdate(nowdate()):
            if not frappe.has_permission("Reservation", "create_backdated"):
                frappe.throw(_("Cannot create reservation in the past"))

    def check_availability(self):
        """Check if room is available for the selected dates"""
        conflicting = frappe.db.sql("""
            SELECT name FROM \`tabReservation\`
            WHERE room = %(room)s
            AND name != %(name)s
            AND status NOT IN ('Cancelled', 'No-Show')
            AND (
                (check_in_date <= %(check_in)s AND check_out_date > %(check_in)s)
                OR (check_in_date < %(check_out)s AND check_out_date >= %(check_out)s)
                OR (check_in_date >= %(check_in)s AND check_out_date <= %(check_out)s)
            )
        """, {
            "room": self.room,
            "name": self.name or "new",
            "check_in": self.check_in_date,
            "check_out": self.check_out_date
        })
        if conflicting:
            frappe.throw(_(f"Room {self.room} is not available for the selected dates. Conflict: {conflicting[0][0]}"))

    def calculate_nights(self):
        if self.check_in_date and self.check_out_date:
            self.nights = date_diff(self.check_out_date, self.check_in_date)

    def calculate_total(self):
        if self.room_rate and self.nights:
            self.total_amount = self.room_rate * self.nights

    def set_room_rate(self):
        """Fetch rate from Rate Plan if not manually set"""
        if not self.room_rate and self.rate_plan:
            rate = frappe.db.get_value(
                "Rate Plan Item",
                {"parent": self.rate_plan, "room_type": self.room_type},
                "rate"
            )
            if rate:
                self.room_rate = rate

    def checkin(self):
        """Process guest check-in"""
        if self.status != "Confirmed":
            frappe.throw(_("Only Confirmed reservations can be checked in"))
        self.status = "Checked In"
        self.actual_check_in = frappe.utils.now()
        self.save()
        # Create guest folio
        folio = create_folio(self)
        self.folio = folio.name
        self.save()
        # Update room status
        self.update_room_status("Occupied")
        # Post first night charge
        self.post_room_charge(folio)
        return folio.name

    def checkout(self):
        """Process guest checkout"""
        if self.status != "Checked In":
            frappe.throw(_("Guest must be Checked In to checkout"))
        self.status = "Checked Out"
        self.actual_check_out = frappe.utils.now()
        self.save()
        # Update room to dirty
        self.update_room_status("Dirty")
        # Settle folio and create invoice
        if self.folio:
            folio_doc = frappe.get_doc("Guest Folio", self.folio)
            return folio_doc.create_invoice()

    def update_room_status(self, status):
        if self.room:
            frappe.db.set_value("Room", self.room, "status", status)

    def post_room_charge(self, folio):
        """Post nightly room charge to folio"""
        folio.append("charges", {
            "charge_date": frappe.utils.today(),
            "charge_type": "Room Charge",
            "description": f"Room {self.room} - {self.room_type}",
            "amount": self.room_rate,
            "reference_doctype": "Reservation",
            "reference_name": self.name,
        })
        folio.save()

    def send_confirmation_email(self):
        """Send booking confirmation via Frappe Email"""
        frappe.sendmail(
            recipients=[self.guest_email],
            subject=f"Reservation Confirmed - {self.property} ({self.name})",
            template="reservation_confirmation",
            args={
                "doc": self,
                "property_name": self.property,
                "guest_name": self.guest_name,
            }
        )
`;

export const NIGHT_AUDIT_PY = `# hospitality_leisure/hotel/doctype/night_audit/night_audit.py
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import today, getdate


class NightAudit(Document):
    """Night Audit — Automated daily hotel processing"""

    def validate(self):
        if frappe.db.exists("Night Audit", {
            "property": self.property,
            "audit_date": self.audit_date,
            "name": ("!=", self.name)
        }):
            frappe.throw(_(f"Night Audit already exists for {self.property} on {self.audit_date}"))

    def post_room_charges(self):
        """Post nightly room rate to all checked-in folios"""
        checked_in = frappe.get_all(
            "Reservation",
            filters={
                "property": self.property,
                "status": "Checked In",
                "check_in_date": ("<=", self.audit_date),
                "check_out_date": (">", self.audit_date),
            },
            fields=["name", "room", "room_type", "room_rate", "folio"]
        )
        
        total_room_revenue = 0
        for res in checked_in:
            if res.folio:
                folio = frappe.get_doc("Guest Folio", res.folio)
                folio.append("charges", {
                    "charge_date": self.audit_date,
                    "charge_type": "Room Charge",
                    "description": f"Night Audit - Room {res.room}",
                    "amount": res.room_rate,
                    "reference_doctype": "Night Audit",
                    "reference_name": self.name,
                })
                folio.save(ignore_permissions=True)
                total_room_revenue += res.room_rate
        
        self.room_revenue = total_room_revenue
        self.rooms_occupied = len(checked_in)

    def calculate_occupancy(self):
        """Calculate occupancy statistics"""
        total_rooms = frappe.db.count("Room", {"property": self.property, "status": ("not in", ["Out of Order", "Out of Service"])})
        self.total_rooms_available = total_rooms
        self.occupancy_rate = round((self.rooms_occupied / total_rooms * 100), 2) if total_rooms else 0
        
        if self.rooms_occupied and self.room_revenue:
            self.adr = round(self.room_revenue / self.rooms_occupied, 2)
            self.revpar = round(self.room_revenue / total_rooms, 2)

    def check_overstays(self):
        """Flag reservations past their checkout date"""
        overstays = frappe.get_all(
            "Reservation",
            filters={
                "property": self.property,
                "status": "Checked In",
                "check_out_date": ("<", self.audit_date),
            },
            fields=["name", "room", "guest"]
        )
        for overstay in overstays:
            frappe.log_error(
                title=f"Overstay Detected: Room {overstay.room}",
                message=f"Reservation {overstay.name} for guest {overstay.guest} is past checkout date"
            )

    def generate_summary(self):
        """Compile audit summary from all departments"""
        # F&B Revenue
        fb_revenue = frappe.db.sql("""
            SELECT SUM(grand_total)
            FROM \`tabSales Invoice\`
            WHERE company = %(company)s
            AND posting_date = %(date)s
            AND docstatus = 1
            AND cost_center LIKE '%%Restaurant%%'
        """, {"company": self.company, "date": self.audit_date})[0][0] or 0
        
        self.fb_revenue = fb_revenue
        self.total_revenue = self.room_revenue + self.fb_revenue + (self.other_revenue or 0)
`;

export const FOOD_ORDER_PY = `# hospitality_leisure/restaurant/doctype/food_order/food_order.py
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now


class FoodOrder(Document):
    """Restaurant Food Order Controller with KDS and Folio Integration"""

    def validate(self):
        self.calculate_total()
        self.set_kitchen_station()

    def on_submit(self):
        """Fire order to Kitchen Display System"""
        self.push_to_kds()
        if self.post_to_folio and self.guest_folio:
            self.post_charge_to_folio()

    def calculate_total(self):
        subtotal = 0
        for item in self.items:
            item.amount = item.qty * item.rate
            subtotal += item.amount
        self.subtotal = subtotal
        self.tax_amount = subtotal * (self.tax_rate or 0) / 100
        self.total = subtotal + self.tax_amount

    def set_kitchen_station(self):
        """Route each item to appropriate kitchen station"""
        for item in self.items:
            if not item.kitchen_station:
                station = frappe.db.get_value(
                    "Menu Item", item.item, "kitchen_station"
                )
                item.kitchen_station = station or "Main Kitchen"

    def push_to_kds(self):
        """Send order to Kitchen Display System via real-time notification"""
        stations = {}
        for item in self.items:
            station = item.kitchen_station or "Main Kitchen"
            if station not in stations:
                stations[station] = []
            stations[station].append({
                "item": item.item,
                "item_name": item.item_name,
                "qty": item.qty,
                "notes": item.special_request,
            })
        
        for station, items in stations.items():
            frappe.publish_realtime(
                event="new_kds_order",
                message={
                    "order": self.name,
                    "table": self.table,
                    "order_time": now(),
                    "items": items,
                    "notes": self.kitchen_notes,
                },
                room=f"kds_{station.lower().replace(' ', '_')}"
            )
        
        self.status = "Preparing"
        self.db_set("status", "Preparing")

    def post_charge_to_folio(self):
        """Post F&B charge to Guest Folio (for in-room dining / hotel guests)"""
        folio = frappe.get_doc("Guest Folio", self.guest_folio)
        folio.append("charges", {
            "charge_date": frappe.utils.today(),
            "charge_type": "Restaurant",
            "description": f"F&B Order {self.name} - Table {self.table}",
            "amount": self.total,
            "reference_doctype": "Food Order",
            "reference_name": self.name,
        })
        folio.save(ignore_permissions=True)
        
        self.folio_posted = 1
        self.db_set("folio_posted", 1)

    def mark_ready(self):
        """Kitchen marks order as ready"""
        self.status = "Ready"
        self.ready_time = now()
        self.save()
        # Notify waiter
        frappe.publish_realtime(
            event="order_ready",
            message={"order": self.name, "table": self.table},
            room=f"pos_{self.outlet}"
        )

    def create_pos_invoice(self):
        """Create ERPNext POS Invoice from this order"""
        pos_invoice = frappe.new_doc("POS Invoice")
        pos_invoice.customer = self.customer or self.get_walk_in_customer()
        pos_invoice.pos_profile = frappe.db.get_value(
            "Restaurant Outlet", self.outlet, "pos_profile"
        )
        for item in self.items:
            pos_invoice.append("items", {
                "item_code": item.item,
                "qty": item.qty,
                "rate": item.rate,
            })
        pos_invoice.save()
        return pos_invoice
`;

export const HOOKS_PY = `# hospitality_leisure/hooks.py

app_name = "hospitality_leisure"
app_title = "Hospitality & Leisure ERP"
app_publisher = "Your Organization"
app_description = "Complete Hospitality & Leisure ERP for Frappe v15 / ERPNext v15"
app_email = "info@yourorg.com"
app_license = "MIT"
app_version = "1.0.0"
required_apps = ["frappe", "erpnext"]

# Fixtures to export with app
fixtures = [
    "Custom Field",
    "Custom DocPerm",
    "Property Type",
    "Charge Type",
    "Room View Type",
    {"dt": "Role", "filters": [["name", "like", "Hotel%"]]},
    {"dt": "Role", "filters": [["name", "like", "Restaurant%"]]},
    {"dt": "Role", "filters": [["name", "like", "Spa%"]]},
    {"dt": "Role", "filters": [["name", "like", "Gym%"]]},
    {"dt": "Notification", "filters": [["module", "=", "Hotel Management"]]},
    {"dt": "Notification", "filters": [["module", "=", "Restaurant Management"]]},
    {"dt": "Notification", "filters": [["module", "=", "Spa & Wellness"]]},
    {"dt": "Notification", "filters": [["module", "=", "Gym & Fitness"]]},
    {"dt": "Workspace", "filters": [["module", "in", [
        "Hotel Management",
        "Restaurant Management",
        "Spa & Wellness",
        "Gym & Fitness",
        "Events & Banquets",
        "Revenue Management"
    ]]]},
]

# Scheduled Tasks
scheduler_events = {
    "daily": [
        "hospitality_leisure.tasks.run_night_audit",
        "hospitality_leisure.tasks.send_membership_expiry_alerts",
        "hospitality_leisure.tasks.send_arrival_reminders",
        "hospitality_leisure.tasks.process_auto_membership_renewals",
        "hospitality_leisure.tasks.send_daily_flash_report",
        "hospitality_leisure.tasks.archive_completed_folios",
    ],
    "hourly": [
        "hospitality_leisure.tasks.update_room_availability_cache",
        "hospitality_leisure.tasks.check_ota_incoming_bookings",
        "hospitality_leisure.tasks.sync_channel_manager_rates",
        "hospitality_leisure.tasks.update_class_enrollment_counts",
    ],
    "weekly": [
        "hospitality_leisure.tasks.send_weekly_revenue_report",
        "hospitality_leisure.tasks.send_membership_activity_report",
        "hospitality_leisure.tasks.clean_expired_gift_vouchers",
    ]
}

# DocType Client Scripts
doctype_js = {
    "Reservation": "public/js/reservation.js",
    "Food Order": "public/js/food_order.js",
    "Spa Appointment": "public/js/spa_appointment.js",
    "Gym Membership": "public/js/gym_membership.js",
    "Event Booking": "public/js/event_booking.js",
    "Guest Folio": "public/js/guest_folio.js",
    "Night Audit": "public/js/night_audit.js",
}

# DocType List Client Scripts
doctype_list_js = {
    "Room": "public/js/room_list.js",
    "Reservation": "public/js/reservation_list.js",
}

# Override ERPNext DocType Classes
override_doctype_class = {
    "Sales Invoice": "hospitality_leisure.overrides.sales_invoice.HospitalitySalesInvoice",
    "POS Invoice": "hospitality_leisure.overrides.pos_invoice.HospitalityPOSInvoice",
}

# Permission Query Conditions (row-level security by property)
permission_query_conditions = {
    "Reservation": "hospitality_leisure.permissions.get_property_query",
    "Room": "hospitality_leisure.permissions.get_property_query",
    "Guest Folio": "hospitality_leisure.permissions.get_property_query",
    "Night Audit": "hospitality_leisure.permissions.get_property_query",
    "Food Order": "hospitality_leisure.permissions.get_outlet_query",
    "Spa Appointment": "hospitality_leisure.permissions.get_outlet_query",
}

has_permission = {
    "Reservation": "hospitality_leisure.permissions.has_reservation_permission",
    "Guest Folio": "hospitality_leisure.permissions.has_folio_permission",
}

# After install
after_install = "hospitality_leisure.setup.install.after_install"
before_uninstall = "hospitality_leisure.setup.uninstall.before_uninstall"

# Website Context
update_website_context = "hospitality_leisure.www.context.get_context"

# Jinja Filters
jinja = {
    "filters": "hospitality_leisure.utils.jinja_filters"
}

# REST API Whitelisted Methods
whitelisted_methods = {
    "hospitality_leisure.api.check_availability": True,
    "hospitality_leisure.api.create_booking": True,
    "hospitality_leisure.api.get_menu": True,
}
`;
