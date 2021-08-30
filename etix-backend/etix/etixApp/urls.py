from django.urls import path, include
from etixApp.views import DestinationViewSet, PaymentViewSet, RowViewSet, SeatTypeViewSet, SeatViewSet, ServicesViewSet, UserViewSet, CustomerViewSet, VendorSerializer, AdminViewSet, TicketViewSet, HelpDeskViewSet, HelpResponseViewSet, CartViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
user = settings.AUTH_USER_MODEL

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
]