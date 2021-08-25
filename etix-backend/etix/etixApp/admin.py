from django.contrib import admin
from .models import User, Customer, Vendor, Admin, Business, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Destination

# Register your models here.
#


@admin.register(User)
class UserModel(admin.ModelAdmin):
    list_filter = ('is_customer', 'is_vendor', 'is_staff')
    list_display = ('userID', 'username', 'is_customer',
                    'is_vendor', 'is_staff')


@admin.register(Customer)
class CustomerModel(admin.ModelAdmin):
    list_filter = ('customerID', 'customerContact_Number')
    list_display = ('customerID', 'customerContact_Number')


@admin.register(Vendor)
class VendorModel(admin.ModelAdmin):
    list_filter = ('vendorID', 'vendorContact_Number', 'vendorStatus')
    list_display = ('vendorID', 'vendorStatus')


@admin.register(Admin)
class AdminModel(admin.ModelAdmin):
    list_filter = ('adminID', 'created_by')
    list_display = ('adminID', 'created_by')


@admin.register(Business)
class BusinessModel(admin.ModelAdmin):
    list_filter = ('businessID', 'businessName', 'businessBankAcc')
    list_display = ('businessID', 'businessName',
                    'businessBankAcc', 'businessDocument')


@admin.register(Ticket)
class TicketModel(admin.ModelAdmin):
    list_filter = ('ticketID', 'ticketName')
    list_display = ('ticketID', 'ticketName')


@admin.register(HelpDesk)
class TicketModel(admin.ModelAdmin):
    list_filter = ('helpdeskID', 'helpdeskStatus')
    list_display = ('helpdeskID', 'helpdeskMessage', 'helpdeskTitle',
                    'helpdeskDateTime', 'helpdeskStatus', 'customer')


@admin.register(HelpResponse)
class TicketModel(admin.ModelAdmin):
    list_filter = ('helpResponseID', 'helpResponseDateTime')
    list_display = ('helpResponseID', 'helpResponseMessage',
                    'helpdesk', 'helpResponseDateTime', 'user')


@admin.register(Cart)
class TicketModel(admin.ModelAdmin):
    list_filter = ('cartID', 'customer')
    list_display = ('cartID', 'service', 'cartTotal', 'customer')


@admin.register(Payment)
class TicketModel(admin.ModelAdmin):
    list_filter = ('paymentID', 'paymentStatus')
    list_display = ('paymentID', 'paymentStatus', 'cart', 'paymentDateTime')


@admin.register(Services)
class TicketModel(admin.ModelAdmin):
    list_filter = ('serviceID', 'serviceStatus')
    list_display = ('serviceID', 'serviceName', 'serviceDesc', 'serviceMedia',
                    'serviceRowCapacity', 'destination', 'serviceStatus', 'vendor')


@admin.register(Destination)
class TicketModel(admin.ModelAdmin):
    list_filter = ('destinationID', 'destinationFrom')
    list_display = ('destinationID', 'destinationTimeDeparture', 'destinationOnwardDate',
                    'destinationStartName', 'destinationEndName', 'destinationFrom', 'destinationTo')
