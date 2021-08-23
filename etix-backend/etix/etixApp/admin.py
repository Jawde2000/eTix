from django.contrib import admin
from .models import User ,Customer, Vendor, Admin, Business, Ticket

# Register your models here.
# 
@admin.register(User)
class UserModel(admin.ModelAdmin):
    list_filter = ('is_customer', 'is_vendor', 'is_staff')
    list_display = ('userID', 'username', 'is_customer', 'is_vendor', 'is_staff')


@admin.register(Customer)
class CustomerModel(admin.ModelAdmin):
    list_filter = ('customerID', 'customerContact_Number')
    list_display = ('customerID', 'customerContact_Number')


@admin.register(Vendor)
class VendorModel(admin.ModelAdmin):
    list_filter = ('vendorID', 'vendorContact_Number', 'vendorStatus')
    list_display = ('vendorStatus')

@admin.register(Admin)
class AdminModel(admin.ModelAdmin):
    list_filter = ('adminID', 'created_by')
    list_display = ('adminID', 'created_by')

@admin.register(Business)
class BusinessModel(admin.ModelAdmin):
    list_filter = ('businessID', 'businessName', 'businessBankAcc')
    list_display = ('businessID', 'businessName', 'businessBankAcc', 'businessDocument')

@admin.register(Ticket)
class TicketModel(admin.ModelAdmin):
    list_filter = ('ticketID', 'ticketName', 'ticketOwn_by')
    list_display = ('ticketID', 'ticketName', 'ticketOwn_by')