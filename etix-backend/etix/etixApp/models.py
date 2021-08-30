from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
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


def generate_ticket_id():

    while True:
        # E represent eTix & T represent ticket same goes to the above function
        code = "E" + str(random.randint(100000, 999999)) + "T"
        if Ticket.objects.filter(ticketID=code).count() == 0:
            break

    return code


def generate_service_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "S"
        if Services.objects.filter(serviceID=code).count() == 0:
            break

    return code


def generate_destination_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "D"
        if Destination.objects.filter(destinationID=code).count() == 0:
            break

    return code


def generate_seattype_id():

    while True:
        code = "E" + str(random.randint(10000, 99999)) + "ST"
        if Destination.objects.filter(destinationID=code).count() == 0:
            break

    return code


def generate_row_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "R"
        if Row.objects.filter(rowID=code).count() == 0:
            break

    return code


def generate_seat_id():

    while True:
        code = "E" + str(random.randint(10000, 99999)) + "SE"
        if Seat.objects.filter(seatID=code).count() == 0:
            break

    return code


def generate_helpdesk_id():

    while True:
        code = "E" + str(random.randint(10000, 99999)) + "HD"
        if HelpDesk.objects.filter(helpdeskID=code).count() == 0:
            break

    return code


def generate_help_response_id():

    while True:
        code = "E" + str(random.randint(10000, 99999)) + "HR"
        if HelpResponse.objects.filter(helpResponseID=code).count() == 0:
            break

    return code

def generate_cart_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "C"
        if Cart.objects.filter(cartID=code).count() == 0:
            break

    return code


def generate_payment_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "P"
        if Payment.objects.filter(paymentID=code).count() == 0:
            break

    return code

# Create your models here.

class MyUserManager(BaseUserManager):
    def create_customer(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have a username")
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )

        user.set_password(password)
        user.save(user=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.model(
            email = self.normalize_email(email),
            password = password,
            username = username,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    userID = models.TextField(
        default=generate_user_id, primary_key=True, unique=True, editable=False, max_length=8)
    username = models.CharField(max_length=100, blank=True, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    Last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_active = models.BooleanField(default=True)  # can login #vendor status
    is_customer = models.BooleanField(default=False)
    is_vendor = models.BooleanField(default=False)
    # staff user but not superuser
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # superuser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyUserManager()

    def __str__(self) -> str:
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_Label):
        return True

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


class Vendor(models.Model):
    created_by = models.OneToOneField(
        User, related_name="vendor", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    vendorID = models.TextField(
        default=generate_vendor_id, primary_key=True, unique=True, editable=False, max_length=8)
    vendorContact_Number = models.TextField(max_length=11)
    vendorStatus = models.BooleanField(default=False)
    vendorName = models.CharField(max_length=100)
    vendorBankAcc = models.CharField(max_length=15)
    vendorRegistrationNo = models.CharField(max_length=15)


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

class Destination(models.Model):
    destinationID = models.TextField(
        default=generate_destination_id, primary_key=True, unique=True, editable=False, max_length=8)
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
    serviceID = models.TextField(
        default=generate_service_id, primary_key=True, unique=True, editable=False, max_length=8)
    destinationTimeDeparture = models.TimeField(blank=True, null=True)
    serviceName = models.TextField(max_length=1000)
    serviceDesc = models.TextField(max_length=10000)
    serviceStatus = models.CharField(max_length=2, choices=service_status)
    serviceRowCapacity = models.IntegerField(blank=True, null=True)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)

class SeatType(models.Model):
    seatTypeID = models.TextField(
        default=generate_seattype_id, primary_key=True, unique=True, editable=False, max_length=8)
    destinationTimeDeparture = models.TimeField(blank=True, null=True)
    seatTypeName = models.TextField(max_length=1000)
    seatTypePrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    seatTypeQuantity = models.IntegerField()
    # FK
    service = models.ForeignKey(Services, on_delete=models.SET_NULL, null=True)

class Row(models.Model):
    rowID = models.TextField(
        default=generate_row_id, primary_key=True, unique=True, editable=False, max_length=8)
    capacity = models.IntegerField()
    # FK
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, null=True)

class Seat(models.Model):
    seatID = models.TextField(
        default=generate_seat_id, primary_key=True, unique=True, editable=False, max_length=8)
    # status changed to boolean because it looks more feasable 
    status = models.BooleanField()
    # FK
    seatType = models.ForeignKey(SeatType, on_delete=models.SET_NULL, null=True)
    row = models.ForeignKey(Row, on_delete=models.SET_NULL, null=True)

class Ticket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ticketID = models.TextField(
        default=generate_ticket_id, primary_key=True, unique=True, editable=False, max_length=8)
    ticketName = models.TextField(max_length=100)
    seat = models.ForeignKey(Seat, on_delete=models.SET_NULL, null=True)

class HelpDesk(models.Model):
    help_desk_status = [
        ("OP", "Open"),
        ("CL", "Close")
    ]
    helpdeskID = models.TextField(
        default=generate_helpdesk_id, primary_key=True, unique=True, editable=False, max_length=8)
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
    helpResponseID = models.TextField(
        default=generate_help_response_id, primary_key=True, unique=True, editable=False, max_length=8)
    helpdesk = models.ForeignKey(
        HelpDesk, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    helpResponseDateTime = models.DateTimeField(auto_now_add=True)
    helpResponseMessage = models.TextField(
        max_length=10000, null=True, blank=True
    )

class Cart(models.Model):
    cartID = models.TextField(
        default=generate_cart_id, primary_key=True, unique=True, editable=False, max_length=8)
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
    paymentID = models.TextField(
        default=generate_payment_id, primary_key=True, unique=True, editable=False, max_length=8)
    cart = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    paymentStatus = models.CharField(max_length=2, choices=payment_status)
    paymentDateTime = models.DateTimeField(auto_now_add=True)


    