from django.contrib import admin
from .models import User, Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Seat, Location
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm

User = get_user_model()

# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['userID', 'email', 'username',
                    'is_superuser', 'is_vendor', 'is_customer']
    list_filter = ['is_superuser', 'is_vendor', 'is_customer']
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ()}),
        ('Permissions', {'fields': ('is_superuser',
                                    'is_active', 'is_vendor', 'is_customer')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password', 'password_2', 'is_superuser', 'is_active', 'is_vendor', 'is_customer')}
         ),
    )
    search_fields = ['email', 'username']
    ordering = ['email']
    filter_horizontal = ()


admin.site.register(User, UserAdmin)


@admin.register(Customer)
class CustomerModel(admin.ModelAdmin):
    list_filter = ('customerID', 'customerContact_Number')
    list_display = ('customerID', 'customerContact_Number')


@admin.register(Vendor)
class VendorModel(admin.ModelAdmin):
    list_filter = ('vendorID', 'vendorContact_Number', 'vendorStatus')
    list_display = ('vendorID', 'vendorContact_Number', 'vendorStatus',
                    'vendorName', 'vendorBankAcc', 'vendorBankName', 'vendorRegistrationNo')


@admin.register(Admin)
class AdminModel(admin.ModelAdmin):
    list_filter = ('adminID', 'created_by')
    list_display = ('adminID', 'created_by')


@admin.register(Ticket)
class TicketModel(admin.ModelAdmin):
    list_filter = ('ticketID', 'service')
    list_display = ('ticketID', 'service')


@admin.register(HelpDesk)
class TicketModel(admin.ModelAdmin):
    list_filter = ('helpdeskID', 'helpdeskStatus')
    list_display = ('helpdeskID', 'helpdeskTitle',
                    'helpdeskDateTime', 'helpdeskStatus', 'user')


@admin.register(HelpResponse)
class TicketModel(admin.ModelAdmin):
    list_filter = ('helpResponseID', 'helpResponseDateTime')
    list_display = ('helpResponseID', 'helpdesk',
                    'helpResponseDateTime', 'user')


@admin.register(Cart)
class TicketModel(admin.ModelAdmin):
    list_filter = ('cartID', 'user')
    list_display = ('cartID', 'service', 'cartTotal', 'user')


@admin.register(Payment)
class TicketModel(admin.ModelAdmin):
    list_filter = ('paymentID', 'paymentStatus')
    list_display = ('paymentID', 'paymentStatus', 'cart', 'paymentDateTime')


@admin.register(Location)
class LocationModel(admin.ModelAdmin):
    list_filter = ('locationID', 'locationName')
    list_display = ('locationID', 'locationName')


@admin.register(Services)
class TicketModel(admin.ModelAdmin):
    list_filter = ('serviceID', 'serviceStatus')
    list_display = ('serviceID', 'serviceName', 'serviceDesc',
                    'serviceStatus', 'serviceTime', 'serviceFrequency',
                    'serviceStartDate', 'vendor', 'seat')


@admin.register(Seat)
class TicketModel(admin.ModelAdmin):
    list_filter = ('seatID', 'economyQuantity', 'businessQuantity',
                   'firstQuantity', 'economyPrice', 'businessPrice', 'firstPrice')
    list_display = ('seatID', 'economyQuantity', 'businessQuantity',
                    'firstQuantity', 'economyPrice', 'businessPrice', 'firstPrice')
