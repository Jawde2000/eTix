from django.shortcuts import render
from .models import Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Destination, Seat, SeatType, Row
from .serializers import UserSerializer, CustomerSerializer, VendorSerializer, AdminSerializer, TicketSerializer, HelpDeskSerializer, HelpResponseSerializer, CartSerializer, PaymentSerializer, ServicesSerializer, DestinationSerializer, SeatSerializer, SeatTypeSerializer, RowSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from django.contrib.auth import get_user_model
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class HelpDeskViewSet(viewsets.ModelViewSet):
    queryset = HelpDesk.objects.all()
    serializer_class = HelpDeskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class HelpResponseViewSet(viewsets.ModelViewSet):
    queryset = HelpResponse.objects.all()
    serializer_class = HelpResponseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class SeatTypeViewSet(viewsets.ModelViewSet):
    queryset = SeatType.objects.all()
    serializer_class = SeatTypeSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class RowViewSet(viewsets.ModelViewSet):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )
