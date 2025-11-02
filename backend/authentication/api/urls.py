from django.urls import path

from . import views

urlpatterns = [
    path("api/users/me", view=views.RegisterAPIView.as_view(), name="me"),
    path("api/users/me/activate", view=views.ActivationAPIView.as_view(), name="activate"),
]
