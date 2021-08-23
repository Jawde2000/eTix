from django.shortcuts import render
from .models import Customer
from .serializers import UserSerializer, CustomerSerializer, VendorSerializer, AdminSerializer, BusinessSerializer, TicketSerializer
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
    serializer_class =CustomerSerializer
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



