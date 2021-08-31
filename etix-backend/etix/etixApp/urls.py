from django.urls import path, include
from etixApp.views import DestinationViewSet, PaymentViewSet, RowViewSet, SeatTypeViewSet, SeatViewSet, ServicesViewSet, UserViewSet, CustomerViewSet, VendorViewSet, AdminViewSet, TicketViewSet, HelpDeskViewSet, HelpResponseViewSet, CartViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
user = settings.AUTH_USER_MODEL

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
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
]
