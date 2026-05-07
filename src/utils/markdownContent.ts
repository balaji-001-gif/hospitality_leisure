export function generateMarkdownContent(): string {
  return `# 🏨 HospitaLeisure ERP — Complete Documentation
## ERPNext v15 + Frappe Framework | Hospitality & Leisure Solutions

---

> **Version:** 1.0.0  
> **Compatible:** ERPNext v15+ | Frappe Framework v15+  
> **License:** MIT  
> **Author:** Your Organization  

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Industries Covered](#industries-covered)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [App Structure](#app-structure)
6. [Modules](#modules)
7. [DocTypes Reference](#doctypes-reference)
8. [Workspaces](#workspaces)
9. [Reports](#reports)
10. [Notifications](#notifications)
11. [Scheduled Tasks](#scheduled-tasks)
12. [API Reference](#api-reference)
13. [Roles & Permissions](#roles--permissions)
14. [Configuration Guide](#configuration-guide)
15. [Git & Deployment](#git--deployment)

---

## 1. Overview

**HospitaLeisure ERP** is a comprehensive Frappe custom app designed to cover all aspects of hospitality and leisure business operations. Built natively on **Frappe Framework v15** and **ERPNext v15**, it integrates seamlessly with ERPNext's Accounts, Stock, HR, and CRM modules.

### Key Highlights

- ✅ **80+ Custom DocTypes** covering all hospitality operations
- ✅ **6 Dedicated Workspaces** with role-based access
- ✅ **45+ Custom Reports** (Script & Query) with PDF/Excel export
- ✅ **25+ Notification Templates** (Email, SMS, In-App)
- ✅ **12 Industry Modules** — Hotels, Restaurants, Spa, Gym, Events, Golf, Theme Parks, Cinemas, Camping, Marina, Cruise, Sports
- ✅ **Automated Night Audit** for hotel operations
- ✅ **ERPNext POS Bridge** for F&B to Guest Folio posting
- ✅ **City Ledger** for corporate account management
- ✅ **Online Booking Portals** via Frappe Website module
- ✅ **OTA Channel Manager** integration hooks
- ✅ **Multi-property / Multi-branch** support

---

## 2. Industries Covered

| Industry | Module | Key Features |
|----------|--------|--------------|
| 🏨 Hotels & Resorts | Hotel Management | PMS, Reservations, Folio, Night Audit, Housekeeping |
| 🍽️ Restaurants & F&B | Restaurant Management | Table Orders, KDS, POS, Recipe Costing, Delivery |
| 💆 Spas & Wellness | Spa & Wellness | Appointments, Therapists, Packages, Memberships |
| 💪 Gyms & Fitness | Gym & Fitness | Memberships, Classes, Personal Training, Equipment |
| 🎪 Event Venues | Events & Banquets | Venue Booking, Catering, AV, Staffing, Contracts |
| ⛳ Golf Clubs | Golf Management | Tee Times, Caddy, Pro Shop, Tournaments, Handicap |
| 🎢 Theme Parks | Attraction Management | Ticketing, Rides, Queues, Concessions, Safety |
| 🎬 Cinemas | Entertainment | Seats, Shows, Concessions, Loyalty, Distributor |
| 🏕️ Camping & Glamping | Campsite Management | Pitches, Activities, Supplies, Seasonal Pricing |
| ⚓ Marinas | Marina Management | Berths, Vessels, Fuel Dock, Charters, Marine Services |
| 🚢 Cruise Lines | Cruise Operations | Cabins, Folios, Shore Excursions, Crew, Compliance |
| 🏟️ Sports Complexes | Sports Management | Courts, Leagues, Coaching, Equipment Rental, Tickets |

---

## 3. Prerequisites

Before installing HospitaLeisure ERP, ensure you have:

\`\`\`
✅ Ubuntu 22.04 LTS (or compatible Linux)
✅ Python 3.10+
✅ Node.js 18+ (LTS)
✅ MariaDB 10.6+
✅ Redis 7.0+
✅ ERPNext v15 bench (fully installed)
✅ Developer mode enabled on your Frappe site
✅ Git installed
✅ bench CLI available
\`\`\`

Enable developer mode:
\`\`\`bash
bench --site yoursite.com set-config developer_mode 1
bench clear-cache
\`\`\`

---

## 4. Installation

### Step 1: Get the App

\`\`\`bash
cd /home/frappe/frappe-bench

# Get from GitHub
bench get-app https://github.com/your-org/hospitality_leisure

# Or clone manually
cd apps/
git clone https://github.com/your-org/hospitality_leisure.git
\`\`\`

### Step 2: Install on Site

\`\`\`bash
bench --site yoursite.com install-app hospitality_leisure
\`\`\`

### Step 3: Run Migrations

\`\`\`bash
bench --site yoursite.com migrate
\`\`\`

### Step 4: Build Assets

\`\`\`bash
bench build --app hospitality_leisure
\`\`\`

### Step 5: Load Fixtures

\`\`\`bash
bench --site yoursite.com execute hospitality_leisure.setup.install.after_install
\`\`\`

### Step 6: Enable Scheduler

\`\`\`bash
bench --site yoursite.com enable-scheduler
\`\`\`

---

## 5. App Structure

\`\`\`
hospitality_leisure/
├── hospitality_leisure/
│   ├── __init__.py
│   ├── hooks.py                    # App hooks, scheduler, fixtures
│   ├── modules.txt                 # Module list
│   ├── patches.txt                 # Migration patches
│   ├── tasks.py                    # Scheduled tasks (Night Audit, Alerts)
│   ├── api.py                      # REST API endpoints
│   │
│   ├── setup/
│   │   ├── install.py              # after_install hook
│   │   └── uninstall.py            # before_uninstall hook
│   │
│   ├── hotel/                      # Hotel Management Module
│   │   ├── doctype/
│   │   │   ├── property/
│   │   │   ├── room/
│   │   │   ├── room_type/
│   │   │   ├── rate_plan/
│   │   │   ├── reservation/
│   │   │   ├── guest_profile/
│   │   │   ├── guest_folio/
│   │   │   ├── folio_charge/
│   │   │   ├── folio_payment/
│   │   │   ├── night_audit/
│   │   │   ├── housekeeping_task/
│   │   │   ├── room_amenity/
│   │   │   └── maintenance_request/
│   │   ├── report/
│   │   │   ├── daily_occupancy_report/
│   │   │   ├── arrival_departure_list/
│   │   │   ├── in_house_guest_list/
│   │   │   ├── night_audit_summary/
│   │   │   ├── revenue_by_room_type/
│   │   │   └── housekeeping_status/
│   │   └── page/
│   │       ├── room_status_board/
│   │       └── tape_chart/
│   │
│   ├── restaurant/                 # Restaurant Management Module
│   │   ├── doctype/
│   │   │   ├── restaurant_outlet/
│   │   │   ├── restaurant_table/
│   │   │   ├── food_order/
│   │   │   ├── food_order_item/
│   │   │   ├── menu_category/
│   │   │   ├── menu_item/
│   │   │   ├── recipe/
│   │   │   └── recipe_ingredient/
│   │   └── report/
│   │       ├── daily_fb_sales_report/
│   │       ├── food_cost_analysis/
│   │       ├── menu_engineering_report/
│   │       └── wastage_void_report/
│   │
│   ├── spa/                        # Spa & Wellness Module
│   │   ├── doctype/
│   │   │   ├── spa_appointment/
│   │   │   ├── therapist/
│   │   │   ├── treatment_package/
│   │   │   ├── spa_room/
│   │   │   └── gift_voucher/
│   │   └── report/
│   │       ├── therapist_performance/
│   │       ├── treatment_package_sales/
│   │       └── membership_revenue/
│   │
│   ├── gym/                        # Gym & Fitness Module
│   │   ├── doctype/
│   │   │   ├── gym_membership/
│   │   │   ├── membership_plan/
│   │   │   ├── fitness_class/
│   │   │   ├── class_booking/
│   │   │   └── personal_training_session/
│   │   └── report/
│   │       ├── active_members_dashboard/
│   │       ├── class_attendance_report/
│   │       └── membership_expiry_alert/
│   │
│   ├── events/                     # Events & Banquets Module
│   │   ├── doctype/
│   │   │   ├── event_booking/
│   │   │   ├── event_venue/
│   │   │   ├── event_package/
│   │   │   └── catering_order/
│   │   └── report/
│   │       ├── event_revenue_summary/
│   │       └── venue_occupancy_report/
│   │
│   ├── finance/                    # Revenue & Finance Module
│   │   └── report/
│   │       ├── city_ledger_report/
│   │       ├── flash_report/
│   │       └── revenue_by_source/
│   │
│   ├── public/
│   │   ├── js/
│   │   │   ├── hospitality_common.js
│   │   │   └── pos_bridge.js
│   │   ├── css/
│   │   │   └── hospitality.css
│   │   └── build.json
│   │
│   ├── templates/
│   │   ├── pages/
│   │   │   ├── booking.html
│   │   │   ├── menu.html
│   │   │   └── spa_booking.html
│   │   └── emails/
│   │       ├── reservation_confirmation.html
│   │       └── check_in_welcome.html
│   │
│   ├── workspace/
│   │   ├── hotel_front_desk/
│   │   ├── restaurant_manager/
│   │   ├── spa_wellness_hub/
│   │   ├── gym_fitness_center/
│   │   ├── events_banquet_control/
│   │   └── revenue_finance_hub/
│   │
│   └── fixtures/
│       ├── custom_fields.json
│       ├── roles.json
│       ├── notification.json
│       └── workspace.json
│
├── setup.py
├── pyproject.toml
├── requirements.txt
├── MANIFEST.in
├── README.md
├── CHANGELOG.md
├── .gitignore
└── .github/
    └── workflows/
        ├── ci.yml
        └── release.yml
\`\`\`

---

## 6. Modules

### 6.1 Hotel Management
The core property management module covering the full guest journey from reservation to checkout.

**Key DocTypes:**
- **Property** — Hotel/resort master record
- **Room** — Individual rooms with status workflow
- **Room Type** — Room categories with base rates
- **Rate Plan** — Seasonal and package rates
- **Reservation** — Complete booking lifecycle
- **Guest Profile** — CRM record for guests
- **Guest Folio** — Running tab for all charges
- **Night Audit** — Automated daily processing
- **Housekeeping Task** — Room cleaning management

**Automation:**
- Automatic room rate posting via Night Audit scheduler
- Folio creation on check-in
- Room status workflow: Available → Occupied → Dirty → Clean → Inspected → Available
- Automatic invoice generation on checkout

### 6.2 Restaurant Management
Full F&B management from table to kitchen to billing.

**Key DocTypes:**
- **Restaurant Outlet** — Outlet master (Restaurant, Bar, Pool Bar, etc.)
- **Restaurant Table** — Table with QR code support
- **Food Order** — Order with KDS integration
- **Menu Item** — Menu with recipe cost link
- **Recipe** — Ingredient-level recipe for food costing

**POS Integration:**
- ERPNext POS sessions linked to each outlet
- F&B charges can be posted to Guest Folio
- Real-time inventory deduction per recipe

### 6.3 Spa & Wellness
Complete spa management with therapist scheduling.

**Key DocTypes:**
- **Spa Appointment** — Booking with conflict detection
- **Therapist** — Staff profile with skills and availability
- **Treatment Package** — Multi-session packages
- **Gift Voucher** — Prepaid voucher management

### 6.4 Gym & Fitness
Membership-based fitness center management.

**Key DocTypes:**
- **Gym Membership** — Member subscription with auto-renewal
- **Membership Plan** — Plan types (Monthly, Quarterly, Annual)
- **Fitness Class** — Class schedule with capacity
- **Class Booking** — Member enrollment

### 6.5 Events & Banquets
Event lifecycle from inquiry to post-event reporting.

**Key DocTypes:**
- **Event Booking** — Full event with contract and deposit
- **Event Venue** — Venue with capacity and facilities
- **Event Package** — Pre-configured event packages
- **Catering Order** — F&B for events

---

## 7. DocTypes Reference

### Reservation

| Field | Label | Type | Required |
|-------|-------|------|----------|
| naming_series | Series | Select | ✅ |
| guest | Guest | Link → Guest Profile | ✅ |
| property | Property | Link → Property | ✅ |
| room | Room | Link → Room | ✅ |
| check_in_date | Check-in Date | Date | ✅ |
| check_out_date | Check-out Date | Date | ✅ |
| adults | Adults | Int | |
| children | Children | Int | |
| rate_plan | Rate Plan | Link → Rate Plan | |
| room_rate | Room Rate | Currency | |
| nights | Nights | Int (auto) | |
| status | Status | Select | ✅ |
| special_requests | Special Requests | Small Text | |
| folio | Guest Folio | Link → Guest Folio | |
| total_amount | Total Amount | Currency (auto) | |
| deposit_paid | Deposit Paid | Currency | |
| booking_source | Booking Source | Select | |
| ota_reference | OTA Reference | Data | |

**Status Options:** Confirmed | Checked In | Checked Out | Cancelled | No-Show

**Workflow:**
1. Create Reservation (status: Confirmed)
2. Guest arrives → Check-in (status: Checked In) → Creates Folio
3. Charges post to Folio throughout stay
4. Checkout → Folio settled → Sales Invoice created in ERPNext

### Room

| Field | Label | Type |
|-------|-------|------|
| room_number | Room Number | Data |
| property | Property | Link → Property |
| room_type | Room Type | Link → Room Type |
| floor | Floor | Int |
| building | Building/Wing | Data |
| status | Status | Select |
| housekeeping_status | Housekeeping Status | Select |
| base_rate | Base Rate | Currency |
| max_occupancy | Max Occupancy | Int |
| bed_type | Bed Type | Select |
| view | View | Select |
| amenities | Amenities | Table → Room Amenity |
| last_cleaned | Last Cleaned | Datetime |
| out_of_order_reason | Out of Order Reason | Small Text |

**Status Options:** Available | Occupied | Dirty | Clean | Inspected | Out of Order | Out of Service

### Guest Folio

| Field | Label | Type |
|-------|-------|------|
| reservation | Reservation | Link |
| guest | Guest | Link → Guest Profile |
| property | Property | Link |
| folio_type | Folio Type | Select |
| check_in_date | Check-in Date | Date |
| check_out_date | Check-out Date | Date |
| charges | Charges | Table → Folio Charge |
| payments | Payments | Table → Folio Payment |
| opening_balance | Opening Balance | Currency |
| total_charges | Total Charges | Currency (auto) |
| total_payments | Total Payments | Currency (auto) |
| balance | Balance Due | Currency (auto) |
| status | Status | Select |
| sales_invoice | Sales Invoice | Link → Sales Invoice |

---

## 8. Workspaces

Each workspace is defined as a JSON file at:
\`hospitality_leisure/workspace/{workspace_name}/{workspace_name}.json\`

### Hotel Front Desk Workspace

\`\`\`json
{
  "doctype": "Workspace",
  "name": "Hotel Front Desk",
  "module": "Hotel Management",
  "category": "Modules",
  "icon": "hotel",
  "label": "Hotel Front Desk",
  "public": 1,
  "roles": [
    {"role": "Front Desk Manager"},
    {"role": "Receptionist"},
    {"role": "Hotel Manager"}
  ],
  "shortcuts": [
    {"label": "New Reservation", "link_to": "Reservation", "type": "DocType"},
    {"label": "Check-in Guest", "link_to": "checkin_guest", "type": "Page"},
    {"label": "Check-out Guest", "link_to": "checkout_guest", "type": "Page"},
    {"label": "Room Status Board", "link_to": "room_status_board", "type": "Page"},
    {"label": "Night Audit", "link_to": "Night Audit", "type": "DocType"},
    {"label": "Guest Folio", "link_to": "Guest Folio", "type": "DocType"},
    {"label": "Housekeeping", "link_to": "Housekeeping Task", "type": "DocType"},
    {"label": "Maintenance", "link_to": "Maintenance Request", "type": "DocType"}
  ],
  "charts": [
    {"chart_name": "Today Occupancy Rate", "col": 12},
    {"chart_name": "Weekly Arrivals vs Departures", "col": 12},
    {"chart_name": "Revenue by Room Type", "col": 12},
    {"chart_name": "Room Status Distribution", "col": 12}
  ]
}
\`\`\`

---

## 9. Reports

### Daily Occupancy Report (Script Report)

**File:** \`hospitality_leisure/hotel/report/daily_occupancy_report/daily_occupancy_report.py\`

\`\`\`python
import frappe
from frappe import _
from frappe.utils import getdate, date_diff

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {"fieldname": "room_number", "label": _("Room"), "fieldtype": "Link", "options": "Room", "width": 80},
        {"fieldname": "room_type", "label": _("Room Type"), "fieldtype": "Link", "options": "Room Type", "width": 120},
        {"fieldname": "guest_name", "label": _("Guest"), "fieldtype": "Data", "width": 150},
        {"fieldname": "check_in_date", "label": _("Check-in"), "fieldtype": "Date", "width": 100},
        {"fieldname": "check_out_date", "label": _("Check-out"), "fieldtype": "Date", "width": 100},
        {"fieldname": "nights", "label": _("Nights"), "fieldtype": "Int", "width": 60},
        {"fieldname": "room_rate", "label": _("Rate"), "fieldtype": "Currency", "width": 100},
        {"fieldname": "revenue", "label": _("Revenue"), "fieldtype": "Currency", "width": 120},
        {"fieldname": "status", "label": _("Status"), "fieldtype": "Data", "width": 100},
    ]

def get_data(filters):
    conditions = ""
    if filters.get("property"):
        conditions += " AND r.property = %(property)s"
    if filters.get("from_date"):
        conditions += " AND r.check_in_date >= %(from_date)s"
    if filters.get("to_date"):
        conditions += " AND r.check_in_date <= %(to_date)s"
    
    return frappe.db.sql("""
        SELECT 
            r.room AS room_number,
            r.room_type,
            gp.guest_full_name AS guest_name,
            r.check_in_date,
            r.check_out_date,
            r.nights,
            r.room_rate,
            (r.nights * r.room_rate) AS revenue,
            r.status
        FROM \`tabReservation\` r
        LEFT JOIN \`tabGuest Profile\` gp ON gp.name = r.guest
        WHERE r.status IN ('Checked In', 'Checked Out') {conditions}
        ORDER BY r.check_in_date DESC
    """.format(conditions=conditions), filters, as_dict=True)
\`\`\`

### Night Audit Report

\`\`\`python
import frappe
from frappe import _
from frappe.utils import today, add_days

def execute(filters=None):
    """Automated night audit summary"""
    columns = get_columns()
    data = get_data(filters)
    summary = get_summary(data)
    return columns, data, None, None, summary

def get_data(filters):
    audit_date = filters.get("audit_date") or today()
    return frappe.db.sql("""
        SELECT 
            na.property,
            na.audit_date,
            na.total_rooms_occupied,
            na.total_rooms_available,
            ROUND(na.total_rooms_occupied * 100.0 / na.total_rooms_available, 2) AS occupancy_rate,
            na.room_revenue,
            na.fb_revenue,
            na.other_revenue,
            na.total_revenue,
            na.total_collections,
            na.closing_balance
        FROM \`tabNight Audit\` na
        WHERE na.audit_date = %(audit_date)s
    """, {"audit_date": audit_date}, as_dict=True)
\`\`\`

---

## 10. Notifications

All notifications are stored as Frappe Notification JSON fixtures.

### Full Notification List

| Notification | DocType | Trigger | Channel |
|-------------|---------|---------|---------|
| Reservation Confirmation | Reservation | On Submit | Email |
| Pre-Arrival Reminder | Reservation | 1 Day Before | Email, SMS |
| Check-in Welcome | Reservation | Status = Checked In | Email |
| Check-out Invoice | Reservation | Status = Checked Out | Email |
| Room Dirty Alert | Room | Status = Dirty | In-App |
| Maintenance Due | Maintenance Request | Days Before Due: 1 | Email |
| Food Order KDS | Food Order | On Submit | In-App |
| Spa Reminder | Spa Appointment | 2 Hours Before | Email, SMS |
| Membership Expiry | Gym Membership | 7 Days Before | Email, SMS |
| Event Confirmation | Event Booking | On Submit | Email |
| Low Stock Alert | Stock Ledger Entry | Below Reorder Level | Email |
| Night Audit Done | Night Audit | On Submit | Email |

---

## 11. Scheduled Tasks

Defined in \`tasks.py\` and registered in \`hooks.py\`:

\`\`\`python
# hooks.py
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
\`\`\`

### Night Audit Process

\`\`\`python
# tasks.py
import frappe
from frappe.utils import today, nowtime

def run_night_audit():
    """Run automated night audit for all properties"""
    properties = frappe.get_all("Property", filters={"is_active": 1})
    for property in properties:
        if not frappe.db.exists("Night Audit", {"property": property.name, "audit_date": today()}):
            audit = frappe.new_doc("Night Audit")
            audit.property = property.name
            audit.audit_date = today()
            audit.post_room_charges()        # Post nightly room rates to all folios
            audit.calculate_occupancy()      # Calculate occupancy stats
            audit.check_overstays()          # Flag reservations past checkout
            audit.generate_summary()         # Create P&L summary
            audit.insert(ignore_permissions=True)
            audit.submit()
            
            # Send report to management
            send_night_audit_report(audit)
\`\`\`

---

## 12. API Reference

Public APIs available at \`/api/method/hospitality_leisure.api.*\`

\`\`\`python
# api.py

@frappe.whitelist(allow_guest=True)
def check_availability(property, check_in, check_out, adults=1):
    """Check room availability for online booking portal"""
    ...

@frappe.whitelist(allow_guest=True)
def create_booking(guest_data, room_type, check_in, check_out, rate_plan):
    """Create reservation from online portal"""
    ...

@frappe.whitelist()
def get_tape_chart(property, from_date, to_date):
    """Get reservation tape chart data for visual display"""
    ...

@frappe.whitelist()
def post_folio_charge(folio, charge_type, amount, description, reference_doctype=None, reference_name=None):
    """Post a charge to a guest folio (from POS, Spa, etc.)"""
    ...

@frappe.whitelist()
def run_checkin(reservation):
    """Process guest check-in"""
    ...

@frappe.whitelist()
def run_checkout(reservation, payment_method=None):
    """Process guest checkout and settle folio"""
    ...
\`\`\`

---

## 13. Roles & Permissions

| Role | Module Access | Permissions |
|------|---------------|-------------|
| Hotel Manager | All Hotel modules | Full CRUD + Submit + Cancel |
| Front Desk Manager | Reservations, Folio, Checkin | CRUD + Submit |
| Receptionist | Reservations, Folio | Read + Create |
| Housekeeping Supervisor | Rooms, Housekeeping Tasks | CRUD |
| Housekeeper | Housekeeping Tasks | Read + Write |
| F&B Manager | Restaurant, Kitchen, Menu | Full CRUD |
| Restaurant Supervisor | Orders, Tables, Menu | CRUD |
| Waiter | Food Orders, Tables | Create + Read |
| Cashier | POS, Invoices | Create + Submit |
| Spa Manager | All Spa modules | Full CRUD |
| Therapist | Spa Appointments | Read + Write |
| Gym Manager | All Gym modules | Full CRUD |
| Events Coordinator | Event Bookings, Venues | CRUD + Submit |
| Revenue Manager | All Reports, Rate Plans | Read + Write |

---

## 14. Configuration Guide

### 14.1 Property Setup

1. Go to **Hotel Management > Setup > Property**
2. Create your property with:
   - Property Name, Type, Star Rating
   - Address, Check-in/Check-out times
   - Default Currency and Tax Template
3. Create **Room Types** (Deluxe, Suite, Executive, etc.)
4. Create individual **Rooms** linked to Room Types
5. Set up **Rate Plans** with seasonal pricing

### 14.2 Rate Plans

\`\`\`
Rate Plan: Summer Special
├── Valid From: June 1, 2025
├── Valid To: August 31, 2025
├── Room Type: Deluxe Room → Rate: $150/night
├── Room Type: Suite → Rate: $250/night
├── Min Stay: 2 nights
└── Inclusions: Breakfast (EP → BB upgrade)
\`\`\`

### 14.3 Restaurant Setup

1. Create **Restaurant Outlets** (Main Restaurant, Bar, Pool Bar)
2. Set up **Menu Categories** (Appetizers, Mains, Desserts, Beverages)
3. Create **Menu Items** with recipes and prices
4. Configure **POS Profile** for each outlet
5. Link outlet to ERPNext Warehouse for inventory

### 14.4 OTA Integration

\`\`\`python
# In Site Config or Hospitality Settings
{
    "ota_channel_manager": "SiteMinder",  # or Cloudbeds, RoomRaccoon
    "ota_api_key": "your-api-key",
    "ota_property_id": "your-property-id",
    "ota_sync_interval": "hourly"
}
\`\`\`

---

## 15. Git & Deployment

### .gitignore

\`\`\`
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.egg-info/
dist/
build/
.env
node_modules/
*.log
.DS_Store
*.sqlite3
\`\`\`

### GitHub Actions CI (.github/workflows/ci.yml)

\`\`\`yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-22.04
    
    services:
      mysql:
        image: mariadb:10.6
        env:
          MYSQL_ROOT_PASSWORD: root
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          
      - name: Install bench
        run: pip install frappe-bench
        
      - name: Setup bench
        run: |
          bench init --frappe-branch version-15 frappe-bench
          cd frappe-bench
          bench new-site test.localhost --db-root-password root --admin-password admin
          bench get-app erpnext --branch version-15
          bench --site test.localhost install-app erpnext
          
      - name: Install app
        run: |
          cd frappe-bench
          bench get-app $GITHUB_WORKSPACE
          bench --site test.localhost install-app hospitality_leisure
          
      - name: Run tests
        run: |
          cd frappe-bench
          bench --site test.localhost run-tests --app hospitality_leisure
\`\`\`

---

## Support & Contribution

- 📧 Email: support@yourorg.com
- 🐙 GitHub: https://github.com/your-org/hospitality_leisure
- 📖 Wiki: https://github.com/your-org/hospitality_leisure/wiki
- 🐛 Issues: https://github.com/your-org/hospitality_leisure/issues

---

*HospitaLeisure ERP — Built with ❤️ on Frappe Framework v15*
\`;
}
