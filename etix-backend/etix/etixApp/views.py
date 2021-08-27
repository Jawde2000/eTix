from django.shortcuts import render
from .models import Customer
from .serializers import UserSerializer, CustomerSerializer, VendorSerializer, AdminSerializer, BusinessSerializer, TicketSerializer, HelpDeskSerializer, HelpResponseSerializer, CartSerializer, PaymentSerializer, ServicesSerializer, DestinationSerializer, SeatSerializer, SeatTypeSerializer, RowSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class VendorViewSet(viewsets.ModelViewSet):
    queryset = VendorSerializer.object.all()
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class AdminViewSet(viewsets.ModelViewSet):
    queryset = AdminSerializer.object.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = BusinessSerializer.object.all()
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class TicketViewSet(viewsets.ModelViewSet):
    queryset = TicketSerializer.object.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class HelpDeskViewSet(viewsets.ModelViewSet):
    queryset = HelpDeskSerializer.object.all()
    serializer_class = HelpDeskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class HelpResponseViewSet(viewsets.ModelViewSet):
    queryset = HelpResponseSerializer.object.all()
    serializer_class = HelpResponseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class CartViewSet(viewsets.ModelViewSet):
    queryset = CartSerializer.object.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = PaymentSerializer.object.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = ServicesSerializer.object.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = DestinationSerializer.object.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

class SeatViewSet(viewsets.ModelViewSet):
    queryset = SeatSerializer.object.all()
    serializer_class = SeatSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

class SeatTypeViewSet(viewsets.ModelViewSet):
    queryset = SeatTypeSerializer.object.all()
    serializer_class = SeatTypeSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

class RowViewSet(viewsets.ModelViewSet):
    queryset = RowSerializer.object.all()
    serializer_class = RowSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )