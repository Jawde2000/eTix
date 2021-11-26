from django.contrib.auth import get_user_model
from django.shortcuts import render
from .models import Customer, Vendor, Admin, Ticket, HelpDesk, HelpResponse, Cart, Payment, Services, Seat, Location, CartItems
from .serializers import UserSerializer, UserSerializerWithToken, CustomerSerializer, VendorSerializer, AdminSerializer, CartItemsSerializer, TicketSerializer, HelpDeskSerializer, HelpResponseSerializer, CartSerializer, PaymentSerializer, ServicesSerializer, SeatSerializer, LocationSerializer, LocationSerializerIDonly, VendorSerializerStripped
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from etix.settings import EMAIL_HOST_USER
from django.core.mail import send_mail


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


# checking if user is exist with email. For forget password.
@api_view(['GET'])
def getUserByEmail(request, pk):
    try:
        user = User.objects.get(email=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'No record Found with given email'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# reset user password to default 123abc


@api_view(['GET'])
def resetPassword(request, pk):

    try:

        user = User.objects.get(email=pk)
        serializer = UserSerializer(user, many=False)

        user.password = make_password('123abc')
        user.save()

        subject = 'Reset Password'
        message = 'Dear customer, your password had been reseted to 123abc. Please login to your account and edit your password as soon as posible.'
        recepient = str(pk)
        send_mail(subject, message, EMAIL_HOST_USER,
                  [recepient], fail_silently=False)

        return Response(serializer.data)
    except:
        message = {'detail': 'Fail to reset Password'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def paymentProcess(request, pk):
    data = request.data
    try:
        cart = Cart.objects.get(cartID=data['cartID'])
        cartobj = CartItems.objects.filter(cart=cart)
        user = User.objects.get(userID=pk)
        em = user.email

        payment = Payment.objects.create(
            cart=cart,
            paymentStatus='CP'
        )
        payment.save()

        for obj in cartobj:
            ticket = Ticket.objects.create(
                service=obj.service,
                ownBy=user,
                vendor=obj.service.vendor,
                payment=payment,
                cart=cart
            )

            if (obj.seat_Type == "F"):
                obj.service.seat.firstQuantity = obj.service.seat.firstQuantity - 1
            elif (obj.seat_Type == "B"):
                obj.service.seat.businessQuantity = obj.service.seat.businessQuantity - 1
            elif (obj.seat_Type == "E"):
                obj.service.seat.economyQuantity = obj.service.seat.economyQuantity - 1

            obj.service.seat.save()

            ticket.save()
            subject = 'Thank you for your purchase from ' + obj.service.vendor.vendorName
            message = 'Dear ' + user.username + ', your payment for a bus ticket from ' + obj.service.vendor.vendorName + ' has been completed!\n\n' + 'Please login in to view your ticket or click this link;\nhttp://localhost:3000/ticket/' + ticket.ticketID + '\n\n From the friendly folks at eTix and ' + obj.service.vendor.vendorName 
            recepient = str(em)
            send_mail(subject, message, EMAIL_HOST_USER,
                        [recepient], fail_silently=False)

        serializer = PaymentSerializer(payment, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Unsuccessful'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def removeCartItem(request, pk):
    try:
        cartItem = CartItems.objects.get(cartItemsID=pk).delete()

        message = {'detail': 'Successful'}
        return Response(message)
    except:
        message = {'detail': 'Unsuccessful'}
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
def getItemsbyCart(request, pk):
    cartitems = CartItems.objects.filter(cart=pk)
    serializer = CartItemsSerializer(cartitems, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listHelpDeskbyUser(request, pk):
    helpreq = HelpDesk.objects.filter(user=pk)
    serializer = HelpDeskSerializer(helpreq, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getReceiverHelpByID(request, pk):
    try:
        helps = HelpDesk.objects.all().filter(receiver=pk)
        serializer = HelpDeskSerializer(helps, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'receiver helplist is empty'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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
def getServicebyID(pk):
    try:
        services = Services.objects.get(serviceID=pk)
        serializer = ServicesSerializer(services, many=false)
        return Response(serializer.data)
    except:
        message = {'detail': 'serviceID invalid'}
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
    
@api_view(['GET'])
def getCartitemByCID(request, pk):
    try:
        cartItem = CartItems.objects.get(cart=pk)
        serializer = CartItemsSerializer(cartItem, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'cart items not found'}
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


class CartItemsViewSet(viewsets.ModelViewSet):
    queryset = CartItems.objects.all()
    serializer_class = CartItemsSerializer
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
