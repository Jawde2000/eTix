from rest_framework import serializers
from .models import Customer, Vendor, Admin, Business, Ticket
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userID', 'username', 'email','password']

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customerID', 'customerFirstName', 'customerLastName', 'customerContact_Number', 'customerAddress', 'customerBirthday']

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vendorID', 'vendorContact_Number', 'vendorStatus']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['adminID']

    def create(self, validated_data):
        admin = Admin.objects.create_user(**validated_data)
        Token.objects.create(admin=admin)
        return admin

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['businessID', 'businessName', 'businessDocument', 'businessBankAcc']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['ticketID', 'ticketName']