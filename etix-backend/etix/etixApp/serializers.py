from rest_framework import serializers
from .models import Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Destination, Seat, SeatType, Row
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userID', 'username', 'email', 'password']

        extra_kwargs = {'password': {
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
        fields = ['customerID', 'customerFirstName', 'customerLastName',
                  'customerContact_Number', 'customerAddress', 'customerBirthday']


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vendorID', 'vendorContact_Number', 'vendorStatus', 'vendorName', 'vendorBankAcc', 'vendorRegistrationNo']


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
        fields = ['businessID', 'businessName',
                  'businessDocument', 'businessBankAcc']


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['ticketID', 'ticketName']


class HelpDeskSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpDesk
        fields = '__all__'


class HelpResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpResponse
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'

class SeatTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatType
        fields = '__all__'

class RowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Row
        fields = '__all__'