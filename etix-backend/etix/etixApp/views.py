from django.contrib.auth import get_user_model
from django.shortcuts import render
from .models import Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Seat, Location
from .serializers import UserSerializer, UserSerializerWithToken, CustomerSerializer, VendorSerializer, AdminSerializer, TicketSerializer, HelpDeskSerializer, HelpResponseSerializer, CartSerializer, PaymentSerializer, ServicesSerializer, SeatSerializer, LocationSerializer, LocationSerializerIDonly, VendorSerializerStripped
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
User = get_user_model()


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# only admin user can get the lists of users


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserById(request, pk):
    user = User.objects.get(userID=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )

        serializer = UserSerializerWithToken(user, many=False)
        user.is_customer = data['is_customer']
        user.is_vendor = data['is_vendor']
        user.is_staff = data['is_staff']
        user.is_superuser = data['is_superuser']
        user.is_active = data['is_active']

        user.save()

        if data['is_customer'] == "True":
            customer = Customer.objects.create(
                created_by=user,
                customerContact_Number=data['phonenumber']
            )

            customer.save()

        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getRoutes(request):
    data = request.data

    try:
        locationone = Location.objects.get(locationName=data['locationFrom'])
        serializerone = LocationSerializerIDonly(locationone, many=False)

        locationtwo = Location.objects.get(locationName=data['locationTo'])
        serializertwo = LocationSerializerIDonly(locationtwo, many=False)

        services = Services.objects.all().filter(locationFrom=serializerone.data['locationID']).filter(
            locationTo=serializertwo.data['locationID'])
        serializer = ServicesSerializer(services, many=True)

        return Response(serializer.data)
    except:
        message = {'detail': 'No routes exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getLocationByID(request):
    data = request.data

    try:
        loc = Location.objects.all().filter(locationID=data['locationID'])
        serializer = LocationSerializer(loc, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'ID not found'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getAllVendors(reqeust):
    vendors = Vendor.objects.all()
    serializer = VendorSerializerStripped(vendors, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def getVendorName(request):
    data = request.data

    try:
        vendor = Vendor.objects.get(vendorID=data['vendorID'])
        serializer = VendorSerializer(vendor, many=False)

        return Response(serializer.data)
    except:
        message = {'detail': 'No vendors exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# update user profile


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.username = data['username']
    user.email = data['email']
    user.is_active = data['is_active']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(userID=pk)

    data = request.data

    user.username = data['username']
    user.email = data['email']
    user.is_active = data['is_active']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
# update customer by userid


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCustomer(request, pk):
    customer = Customer.objects.get(created_by=pk)

    data = request.data
    customer.customerFirstName = data['customerFirstName']
    customer.customerLastName = data['customerLastName']
    customer.customerContact_Number = data['customerContact_Number']
    customer.customerAddress = data['customerAddress']
    customer.customerBirthday = data['customerBirthday']
    customer.customerGender = data['customerGender']

    customer.save()

    serializer = CustomerSerializer(customer, many=False)

    return Response(serializer.data)
# update vendor by userid


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateVendor(request, pk):
    vendor = Vendor.objects.get(created_by=pk)

    data = request.data
    vendor.vendorContact_Number = data['vendorContact_Number']
    vendor.vendorStatus = data['vendorStatus']
    vendor.vendorName = data['vendorName']
    vendor.vendorBankName = data['vendorBankName']
    vendor.vendorBankAcc = data['vendorBankAcc']
    vendor.vendorRegistrationNo = data['vendorRegistrationNo']

    vendor.save()

    serializer = VendorSerializer(vendor, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def createHelpDesk(request, pk):

    data = request.data

    userreq = User.objects.get(userID=data['userID'])

    if (pk == 'admin'):
        helpreq = HelpDesk.objects.create(
            helpdeskTitle=data['title'],
            helpdeskMessage=data['message'],
            user=userreq,
            to_admin=True,
            helpdeskStatus='OP'
        )
    else:
        vendor = Vendor.objects.get(vendorID=pk)

        helpreq = HelpDesk.objects.create(
            helpdeskTitle=data['title'],
            helpdeskMessage=data['message'],
            user=userreq,
            receiver=vendor,
            to_vendor=True,
            helpdeskStatus='OP'
        )

    helpreq.save()

    serializer = HelpDeskSerializer(helpreq, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listHelpDeskbyUser(request, pk):
    helpreq = HelpDesk.objects.filter(user=pk)
    serializer = HelpDeskSerializer(helpreq, many=True)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userToDelete = User.objects.get(userID=pk)
    userToDelete.delete()
    return Response('User was deleted')


@api_view(['GET'])
def getCustomerByUserID(request, pk):
    customer = Customer.objects.get(created_by=pk)
    serializer = CustomerSerializer(customer, many=False)
    return Response(serializer.data)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


@api_view(['GET'])
def getVendorByUserID(reqeust, pk):
    vendor = Vendor.objects.get(created_by=pk)
    serializer = VendorSerializer(vendor, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getServiceByVendorID(request, pk):
    try:
        services = Services.objects.all().filter(vendor=pk)
        serializer = ServicesSerializer(services, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'service not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getVendorHelpByID(request, pk):
    try:
        helps = HelpDesk.objects.all().filter(user=pk)
        serializer = HelpDeskSerializer(helps, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'vendor helplist is empty'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getVendorDByVID(request, pk):
    try:
        vendor = Vendor.objects.get(vendorID=pk)
        serializer = VendorSerializer(vendor, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'vendor not found'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHelpResponseByHelpID(reqeust, pk):
    helpresponse = HelpResponse.objects.get(helpdesk=pk)
    serializer = HelpResponseSerializer(helpresponse, many=False)
    return Response(serializer.data)


class HelpDeskViewSet(viewsets.ModelViewSet):
    queryset = HelpDesk.objects.all()
    serializer_class = HelpDeskSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class HelpResponseViewSet(viewsets.ModelViewSet):
    queryset = HelpResponse.objects.all()
    serializer_class = HelpResponseSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


@api_view(['GET'])
def getSeatByID(reqeust, pk):
    seat = Seat.objects.get(seatID=pk)
    serializer = SeatSerializer(seat, many=False)
    return Response(serializer.data)


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
