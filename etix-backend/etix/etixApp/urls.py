from django.urls import path, include
from etixApp.views import PaymentViewSet, SeatViewSet, ServicesViewSet, CustomerViewSet, VendorViewSet, AdminViewSet, TicketViewSet, HelpDeskViewSet, HelpResponseViewSet, CartViewSet, LocationViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from . import views
user = settings.AUTH_USER_MODEL

router = DefaultRouter()
# router.register('users', UserViewSet, basename='users')
router.register('payment', PaymentViewSet, basename='payment')
router.register('seat', SeatViewSet, basename='seat')
router.register('service', ServicesViewSet, basename='service')
router.register('customer', CustomerViewSet, basename='customer')
router.register('vendor', VendorViewSet, basename='vendor')
router.register('admin', AdminViewSet, basename='admin')
router.register('ticket', TicketViewSet, basename='ticket')
router.register('helpdesk', HelpDeskViewSet, basename='helpdesk')
router.register('helpresponse', HelpResponseViewSet, basename='helpresponse')
router.register('cart', CartViewSet, basename='cart')
router.register('cartitems', views.CartItemsViewSet, basename='cartitems')
router.register('location', LocationViewSet, basename='location')


urlpatterns = [
    path('api/', include(router.urls)),

    # api path for login, method post
    path('api/users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    # api path for getting cart items by cartID
    path('api/cart/retrieve/<str:pk>/', views.getItemsbyCart, name='cart-items-by-id'),

    # api path for register new user, method post
    path('api/users/register/', views.registerUser, name='register'),

    # payment processing api
    path('api/payment/success/<str:pk>/', views.paymentProcess, name='payment-process'),

    # api path for get all users, method get (only admin can access)
    path('api/users/', views.getUsers, name="users-profile"),
    # api path to get user profile (must be logged in first)
    path('api/users/profile/', views.getUserProfile, name="user-profile"),

    # get single user by id
    path('api/user/<str:pk>/', views.getUserById, name='user'),

    # get customer by userID
    path('api/user/customer/<str:pk>/',
         views.getCustomerByUserID, name='customer-userid'),

    # get vendor by userID
    path('api/user/vendor/<str:pk>/',
         views.getVendorByUserID, name='vendor-userid'),

    # get service by vendorID
    path('api/user/service/<str:pk>/',
         views.getServiceByVendorID, name='service-vendorid'),

    # get vendor helplist by vendorID
    path('api/user/vendorhelp/<str:pk>/',
         views.getVendorHelpByID, name='help-vendorid'),

    # get list of services by location
    path('api/service/routes', views.getRoutes, name='route-query'),

    # get vendor name by vendor ID
    path('api/vendor', views.getVendorName, name='vendor-query'),

    # api path to update logged in user profile
    path('api/user/profile/update/', views.updateUserProfile,
         name="user-profile-update"),

    # get location by locationID
    path('api/location', views.getLocationByID,
         name="location-query"),

    # update user by id
    path('api/user/update/<str:pk>/', views.updateUser,
         name="user-update"),

    path('api/vendor/list', views.getAllVendors,
         name="vendor-list"),

    # update customer by userid
    path('api/user/customer/update/<str:pk>/',
         views.updateCustomer, name="customer-update"),

    # update vendor by userid
    path('api/user/vendor/update/<str:pk>/',
         views.updateVendor, name="vendor-update"),

    # get helpdesk response by help id
    path('api/help/response/<str:pk>/',
         views.getHelpResponseByHelpID, name="help-detail"),

    # create helpdesk request
    path('api/help/request/create/<str:pk>/',
         views.createHelpDesk, name="help-create"),

    # list help requests by user
    path('api/help/request/list/<str:pk>/',
         views.listHelpDeskbyUser, name="help-list-user"),

    # get seat details by id for customer,
    path('api/seat/detail/<str:pk>/', views.getSeatByID, name="seat-detail"),

    # get vendor details by vendor id,
    path('api/vendorD/<str:pk>/', views.getVendorDByVID, name="vDetail"),

    # api path to delete users
    path('api/user/delete/<str:pk>/', views.deleteUser, name='user-delete'),

]
