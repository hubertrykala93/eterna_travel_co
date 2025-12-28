from django.urls import path

from . import views

urlpatterns = [
    path("api/users/me", view=views.MeAPIView.as_view(), name="me"),
    path("api/users/me/activate", view=views.ActivationAPIView.as_view(), name="activate"),
    path("api/users/me/login", view=views.LoginAPIView.as_view(), name="login"),
    path("api/users/me/token", view=views.RefreshTokenAPIView.as_view(), name="token"),
    path("api/users/me/logout", view=views.LogoutAPIView.as_view(), name="logout")
]
