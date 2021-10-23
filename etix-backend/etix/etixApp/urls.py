from django.urls import path, include
from etixApp.views import DestinationViewSet, PaymentViewSet, RowViewSet, SeatTypeViewSet, SeatViewSet, ServicesViewSet, CustomerViewSet, VendorViewSet, AdminViewSet, TicketViewSet, HelpDeskViewSet, HelpResponseViewSet, CartViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from . import views
user = settings.AUTH_USER_MODEL

router = DefaultRouter()
# router.register('users', UserViewSet, basename='users')
router.register('destination', DestinationViewSet, basename='destination')
router.register('payment', PaymentViewSet, basename='payment')
router.register('row', RowViewSet, basename='row')
router.register('seattype', SeatTypeViewSet, basename='seattype')
router.register('seat', SeatViewSet, basename='seat')
router.register('service', ServicesViewSet, basename='service')
router.register('customer', CustomerViewSet, basename='customer')
router.register('vendor', VendorViewSet, basename='vendor')
router.register('admin', AdminViewSet, basename='admin')
router.register('ticket', TicketViewSet, basename='ticket')
router.register('helpdesk', HelpDeskViewSet, basename='helpdesk')
router.register('helpresponse', HelpResponseViewSet, basename='helpresponse')
router.register('cart', CartViewSet, basename='cart')


urlpatterns = [
    path('api/', include(router.urls)),

    # api path for login, method post
    path('api/users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    # api path for register new user, method post
    path('api/users/register/', views.registerUser, name='register'),

    # api path for get all users, method get (only admin can access)
    path('api/users/', views.getUsers, name="users-profile"),
    # api path to get user profile (must be logged in first)
    path('api/users/profile/', views.getUserProfile, name="user-profile"),

    # get single user by id
    path('api/user/<str:pk>/', views.getUserById, name='user'),

    # api path to update logged in user profile
    path('api/user/profile/update/', views.updateUserProfile,
         name="user-profile-update"),

    # update user by id
    path('api/user//update/<str:pk>/', views.updateUser,
         name="user-update"),


    # api path to delete users
    path('api/user/delete/<str:pk>/', views.deleteUser, name='user-delete'),




]
