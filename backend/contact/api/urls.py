from django.urls import path
from . import views
from . import views

urlpatterns = [
    path("api/contact", view=views.ContactUsAPIView.as_view(), name="contact")
]