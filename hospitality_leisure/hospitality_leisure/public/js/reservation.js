frappe.ui.form.on('Reservation', {
	refresh: function(frm) {
		if (frm.doc.status === 'Confirmed') {
			frm.add_custom_button(__('Check-in'), function() {
				frm.call('checkin').then(r => {
					if (r.message) {
						frappe.show_alert(__('Guest checked in successfully'));
						frappe.set_route('Form', 'Guest Folio', r.message);
					}
				});
			}, __('Actions'));
		}
		
		if (frm.doc.status === 'Checked In') {
			frm.add_custom_button(__('Checkout'), function() {
				frm.call('checkout').then(r => {
					if (r.message) {
						frappe.show_alert(__('Guest checked out successfully'));
						frm.reload_doc();
					}
				});
			}, __('Actions'));
		}
	}
});
