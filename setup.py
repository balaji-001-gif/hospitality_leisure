from setuptools import setup, find_packages

setup(
	name="hospitality_leisure",
	version="1.0.0",
	description="Complete Hospitality and Leisure ERP Solution",
	author="Your Organization",
	author_email="support@yourorg.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=[
		"frappe",
		"erpnext"
	]
)
