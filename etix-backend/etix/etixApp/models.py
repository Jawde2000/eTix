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

    userID = models.TextField(default=
        generate_user_id, primary_key=True, unique=True, editable=False, max_length=8)
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
    adminID = models.TextField(default=generate_admin_id , primary_key=True, unique=True, editable=False, max_length=8)


class Ticket(models.Model):
    ticketOwn_by = models.ForeignKey(
        Customer, related_name='ticket', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    ticketID = models.TextField(
        default=generate_ticket_id, primary_key=True, unique=True, editable=False, max_length=8)
    ticketName = models.TextField(max_length=100)
    # add sitID
    # add serviceID
