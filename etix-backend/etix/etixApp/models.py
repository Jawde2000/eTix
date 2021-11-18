from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import random
from django.utils.crypto import get_random_string


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


def generate_cart_items_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "C"
        if CartItems.objects.filter(cartItemsID=code).count() == 0:
            break

    return code


def generate_payment_id():

    while True:
        code = "E" + str(random.randint(100000, 999999)) + "P"
        if Payment.objects.filter(paymentID=code).count() == 0:
            break

    return code


def generate_location_id():

    while True:
        code = "E" + str(random.randint(100, 999)) + "L"
        if Location.objects.filter(locationID=code).count() == 0:
            break

    return code


def get_token():

    while True:
        tk = get_random_string(length=32)
        if Ticket.objects.filter(Token=tk).count() == 0:
            break

    return str(tk)

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **other_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username, **other_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **other_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            username=username,
            password=password, **other_fields
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

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

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
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
    customerGender = models.CharField(
        max_length=1, blank=True, choices=genderChoices)
    customerFirstName = models.CharField(max_length=100, blank=True)
    customerLastName = models.CharField(max_length=100, blank=True)
    customerContact_Number = models.TextField(max_length=16, blank=True)
    customerAddress = models.TextField(max_length=200, blank=True)
    customerBirthday = models.DateField(blank=True, null=True)

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
    vendorContact_Number = models.TextField(max_length=16)
    vendorStatus = models.BooleanField(default=False)
    vendorName = models.CharField(max_length=100)
    vendorBankName = models.CharField(max_length=100)
    vendorBankAcc = models.CharField(max_length=16)
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


class Seat(models.Model):
    seatID = models.TextField(
        default=generate_seat_id, primary_key=True, unique=True, editable=False, max_length=8)
    # new set
    firstQuantity = models.IntegerField(blank=True, null=True)
    businessQuantity = models.IntegerField(blank=True, null=True)
    economyQuantity = models.IntegerField(blank=True, null=True)
    firstPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    businessPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    economyPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)


class Location(models.Model):
    locationID = models.TextField(
        default=generate_location_id, primary_key=True, unique=True, editable=False, max_length=5)
    locationName = models.TextField(max_length=1000)


class Services(models.Model):
    service_status = [
        ("O", "Active"),
        ("X", "Inactive")
    ]
    service_frequency = [
        ("D", "Daily"),
        ("W", "Weekly"),
        ("M", "Monthly"),
        ("O", "Once")
    ]
    serviceID = models.TextField(
        default=generate_service_id, primary_key=True, unique=True, editable=False, max_length=8)
    serviceName = models.TextField(max_length=1000)
    serviceDesc = models.TextField(max_length=10000)
    serviceStatus = models.CharField(max_length=1, choices=service_status)
    serviceTime = models.TimeField(blank=True, null=True)
    serviceFrequency = models.CharField(
        max_length=7, choices=service_frequency)
    serviceEndDate = models.DateField()
    serviceStartDate = models.DateField()
    servicedepartureTerminal = models.TextField(max_length=1000)
    servicearrivalTerminal = models.TextField(max_length=1000)
    # FK
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    seat = models.ForeignKey(Seat, on_delete=models.SET_NULL, null=True)
    locationTo = models.ForeignKey(
        Location, related_name='%(class)s_location_to', on_delete=models.SET_NULL, null=True)
    locationFrom = models.ForeignKey(
        Location, related_name='%(class)s_location_from', on_delete=models.SET_NULL, null=True)


class Cart(models.Model):
    cartID = models.TextField(
        default=generate_cart_id, primary_key=True, unique=True, editable=False, max_length=8)
    cartTotal = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)

class Payment(models.Model):
    payment_status = [
        ("UP", "UnPaid"),
        ("CP", "Complete")
    ]
    paymentID = models.TextField(
        default=generate_payment_id, primary_key=True, unique=True, editable=False, max_length=8)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)
    paymentStatus = models.CharField(max_length=2, choices=payment_status)
    paymentDateTime = models.DateField(auto_now_add=True)

class CartItems(models.Model):
    seat_type = [
        ("F", "First Class"),
        ("B", "Business Class"),
        ("E", "Economy Class"),
    ]
    cartItemsID = models.TextField(
        default=generate_cart_items_id, primary_key=True, unique=True, editable=False, max_length=8)
    service = models.ForeignKey(Services, on_delete=models.SET_NULL, null=True)
    seat_Type = models.CharField(max_length=1, choices=seat_type)
    seat_price = models.DecimalField(
        max_digits=10, decimal_places=2
    )
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)

class Ticket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ticketID = models.TextField(
        default=generate_ticket_id, primary_key=True, unique=True, editable=False, max_length=8)
    service = models.ForeignKey(Services, on_delete=models.SET_NULL, null=True)
    ownBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)
    used = models.BooleanField(default=False)
    Token = models.TextField(
        default=get_token, unique=True, editable=False, max_length=32)


class HelpDesk(models.Model):
    help_desk_status = [
        ("OP", "Open"),
        ("CL", "Close"),
        ("RP", "Responded")
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
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    receiver = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    to_vendor = models.BooleanField(default=False)
    to_admin = models.BooleanField(default=False)
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