from django.db import models
from django.contrib.auth.models import AbstractUser
import random


def generate_user_id():

    while True:
        code = "U" + str(random.randint(1000000, 9999999))
        if User.objects.filter(userID=code).count() == 0:
            break

    return code


def generate_customer_id():

    while True:
        code = str(random.randint(10000000, 79999999))
        if Customer.objects.filter(customerID=code).count() == 0:
            break

    return code


def generate_vendor_id():

    while True:
        code = str(random.randint(80000000, 99999999))
        if Vendor.objects.filter(vendorID=code).count() == 0:
            break

    return code


def generate_admin_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "A"
        if Admin.objects.filter(adminID=code).count() == 0:
            break

    return code


def generate_business_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "B"
        if Business.objects.filter(businessID=code).count() == 0:
            break

    return code


def generate_ticket_id():

    while True:
        # E represent eTix & T represent ticket same goes to the above function
        code = "E" + str(random.randint(100000, 999999)) + "T"
        if Ticket.objects.filter(ticketID=code).count() == 0:
            break

    return code

# Create your models here.


class User(AbstractUser):

    userID = models.TextField(
        default=str(generate_user_id), primary_key=True, unique=True, editable=False, max_length=8)
    username = models.CharField(max_length=100, blank=True, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    Last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_active = models.BooleanField(default=True)  # can login #vendor status
    is_customer = models.BooleanField(default=False)
    is_vendor = models.BooleanField(default=False)
    # staff user but not superuser
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # superuser


class Customer(models.Model):
    genderChoices = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('P', 'Prefer not to say')
    ]
    created_by = models.OneToOneField(
        User, related_name="customer", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    customerID = models.TextField(
        default=generate_customer_id, primary_key=True, unique=True, editable=False, max_length=8)
    customerGender = models.CharField(max_length=1, choices=genderChoices)
    customerFirstName = models.CharField(max_length=100, blank=True)
    customerLastName = models.CharField(max_length=100, blank=True)
    customerContact_Number = models.TextField(max_length=11, blank=True)
    customerAddress = models.TextField(max_length=200, blank=True)
    customerBirthday = models.DateField(auto_now=False, auto_now_add=False)

    class Meta:
        ordering = ['customerID']

    def __str__(self):
        return self.customerID


class Business(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    businessID = models.TextField(
        default=generate_business_id, primary_key=True, unique=True, editable=False, max_length=8)
    businessName = models.CharField(max_length=100)
    businessDocument = models.FileField()
    businessBankAcc = models.CharField(max_length=15)


class Vendor(models.Model):
    created_by = models.OneToOneField(
        User, related_name="vendor", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    vendorID = models.TextField(
        default=generate_vendor_id, primary_key=True, unique=True, editable=False, max_length=8)
    vendorContact_Number = models.TextField(max_length=11)
    vendorStatus = models.BooleanField(default=False)
    vendorBusinessDoc = models.ForeignKey(
        Business, related_name='business', on_delete=models.CASCADE)

    class Meta:
        ordering = ['vendorID']

    def __str__(self):
        return self.vendorID


class Admin(models.Model):
    created_by = models.OneToOneField(
        User, related_name="admin", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    adminID = models.TextField(
        default=generate_admin_id, primary_key=True, unique=True, editable=False, max_length=8)


class Ticket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ticketID = models.TextField(
        default=generate_ticket_id, primary_key=True, unique=True, editable=False, max_length=8)
    ticketName = models.TextField(max_length=100)
    # add sitID
    # add serviceID


class HelpDesk(models.Model):
    help_desk_status = [
        ("OP", "Open"),
        ("CL", "Close")
    ]
    helpdeskID = models.AutoField(primary_key=True, editable=False)
    helpdeskTitle = models.TextField(
        max_length=200, null=True
    )
    helpdeskMessage = models.TextField(
        max_length=10000, null=True, blank=True
    )
    helpdeskDateTime = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, null=True)
    helpdeskStatus = models.CharField(max_length=2, choices=help_desk_status)


class HelpResponse(models.Model):
    helpResponseID = models.AutoField(primary_key=True, editable=False)
    helpdesk = models.ForeignKey(
        HelpDesk, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    helpResponseDateTime = models.DateTimeField(auto_now_add=True)
    helpResponseMessage = models.TextField(
        max_length=10000, null=True, blank=True
    )


class Destination(models.Model):
    destinationID = models.AutoField(primary_key=True, editable=False)
    destinationTimeDeparture = models.TimeField(blank=True, null=True)
    destinationOnwardDate = models.DateField()
    destinationStartName = models.TextField(max_length=1000)
    destinationEndName = models.TextField(max_length=1000)
    destinationFrom = models.TextField(max_length=1000)
    destinationTo = models.TextField(max_length=1000)


class Services(models.Model):
    service_status = [
        ("AC", "active"),
        ("DC", "Disactive")
    ]
    serviceID = models.AutoField(primary_key=True, editable=False)
    serviceName = models.TextField(max_length=1000)
    serviceDesc = models.TextField(max_length=10000)
    serviceStatus = models.CharField(max_length=2, choices=service_status)
    serviceRowCapacity = models.IntegerField(blank=True, null=True)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)


class Cart(models.Model):
    cartID = models.AutoField(primary_key=True, editable=False)
    service = models.ForeignKey(Services, on_delete=models.SET_NULL, null=True)
    cartTotal = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, null=True)


class Payment(models.Model):
    payment_status = [
        ("UP", "UnPaid"),
        ("CP", "Complete")
    ]
    paymentID = models.AutoField(primary_key=True, editable=False)
    cart = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    paymentStatus = models.CharField(max_length=2, choices=payment_status)
    paymentDateTime = models.DateTimeField(auto_now_add=True)

class SeatType(models.Model):
    seatTypeID = models.AutoField(primary_key=True, editable=False)
    seatTypeName = models.TextField(max_length=1000)
    seatTypePrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    seatTypeQuantity = models.IntegerField()
    # FK
    service = models.ForeignKey(Services, on_delete=models.SET_NULL, null=True)


class Row(models.Model):
    rowID = models.AutoField(primary_key=True, editable=False)
    capacity = models.IntegerField()
    # FK
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, null=True)

class Seat(models.Model):
    seatID = models.AutoField(primary_key=True, editable=False)
    # status changed to boolean because it looks more feasable 
    status = models.BooleanField()
    # FK
    seatType = models.ForeignKey(SeatType, on_delete=models.SET_NULL, null=True)
    row = models.ForeignKey(Row, on_delete=models.SET_NULL, null=True)


    