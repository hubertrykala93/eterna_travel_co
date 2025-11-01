from django.urls import path
from . import views

urlpatterns = [
    path("api/users/me", view=views.UsersAPIView.as_view(), name="contact")
]