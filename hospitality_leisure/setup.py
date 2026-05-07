from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in hospitality_leisure/__init__.py
from hospitality_leisure import __version__ as version

setup(
	name="hospitality_leisure",
	version=version,
	description="Complete Hospitality and Leisure ERP Solution",
	author="Your Organization",
	author_email="support@yourorg.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
