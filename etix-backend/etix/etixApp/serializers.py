from rest_framework import serializers
from .models import User, Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Seat, Location
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import Token
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userID', 'username', 'email',
                  'is_customer', 'is_vendor', 'is_staff', 'is_superuser', 'is_active']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['userID', 'username', 'email',
                  'is_customer', 'is_vendor', 'is_staff', 'is_superuser', 'is_active', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customerID', 'customerFirstName', 'customerLastName', 'customerGender',
                  'customerContact_Number', 'customerAddress', 'customerBirthday', 'created_by']


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vendorID', 'vendorContact_Number', 'vendorStatus',
                  'vendorName', 'vendorBankName', 'vendorBankAcc', 'vendorRegistrationNo', 'created_by']


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['adminID']

    def create(self, validated_data):
        admin = Admin.objects.create_user(**validated_data)
        Token.objects.create(admin=admin)
        return admin


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


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


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'
