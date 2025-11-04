import os

from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .backends import CookieJWTAuthentication
from .serializers import UserSerializer
from .tokens import token_generator
from ..models import User


class MeAPIView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = UserSerializer(instance=request.user)

        return Response(data=user.data)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        if User.objects.filter(email=request.data.get("email")).exists():
            return Response(
                data={
                    "title": "EMAIL_EXISTS",
                    "message": "USER_WITH_THIS_EMAIL_ALREADY_EXISTS",
                    "status": "error",
                },
                status=HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=request.data.get("username")).exists():
            return Response(
                data={
                    "title": "USERNAME_EXISTS",
                    "message": "USER_WITH_THIS_USERNAME_ALREADY_EXISTS",
                    "status": "error",
                },
                status=HTTP_400_BAD_REQUEST,
            )

        if request.data.get("password") != request.data.get("repassword"):
            return Response(
                data={
                    "title": "PASSWORDS_DO_NOT_MATCH",
                    "message": "PASSWORDS_ARE_NOT_IDENTICAL",
                    "status": "error",
                },
                status=HTTP_400_BAD_REQUEST,
            )

        if serializer.is_valid():
            try:
                with transaction.atomic():
                    user = serializer.save()
                    email = user.email

                    uid = urlsafe_base64_encode(force_bytes(user.id))
                    token = token_generator.make_token(user=user)

                    protocol = "https://" if request.is_secure() else "http://"
                    activation_url = f"{protocol}{os.environ.get('ACTIVATION_URL')}?uid={uid}&token={token}"

                    html_message = render_to_string(
                        template_name="authentication/activation-email.html",
                        context={"activation_url": activation_url},
                        request=request,
                    )

                    plain_message = strip_tags(html_message)

                    message = EmailMultiAlternatives(
                        subject="Account Activation Request",
                        body=plain_message,
                        from_email=os.environ.get("EMAIL_FROM"),
                        to=[email],
                    )

                    message.attach_alternative(
                        content=html_message, mimetype="text/html"
                    )
                    message.send()

                    return Response(status=HTTP_201_CREATED)

            except Exception:
                return Response(
                    data={
                        "title": "UNEXPECTED_ERROR",
                        "message": "PLEASE_TRY_AGAIN_LATER",
                        "status": "error",
                    },
                    status=HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            data={
                "title": "INVALID_DATA",
                "message": "PROVIDED_USER_DATA_IS_NOT_VALID",
                "status": "error"
            },
            status=HTTP_400_BAD_REQUEST,
        )


class ActivationAPIView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        uid = request.data.get("uid")
        token = request.data.get("token")

        if not uid or not token:
            return Response(data={
                "title": "INVALID_ACTIVATION_LINK",
                "message": "ACTIVATION_LINK_IS_MISSING",
                "status": "error",
                "redirect_url": os.environ.get("REGISTER_URL")
            })

        try:
            id = force_str(s=urlsafe_base64_decode(s=uid))
            user = User.objects.get(id=id)

            if user.is_verified:
                return Response(data={
                    "title": "ALREADY_VERIFIED",
                    "message": "ALREADY_VERIFIED_PLEASE_LOG_IN",
                    "status": "info",
                }, status=HTTP_200_OK)

            user.is_verified = True
            user.save()

            return Response(data={
                "title": "ACTIVATION_SUCCESSFULLY",
                "message": "YOUR_ACCOUNT_IS_ACTIVE",
                "status": "success"
            }, status=HTTP_200_OK)

        except Exception:
            return Response(data={
                "title": "ACTIVATION_FAILED",
                "message": "ACTIVATION_LINK_IS_INVALID",
                "status": "error",
                "redirect_url": os.environ.get("REGISTER_URL")
            }, status=HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")

        if not User.objects.filter(username=username).exists():
            return Response(data={
                "title": "USER_NOT_FOUND",
                "message": "NO_ACCOUNT_FOUND_WITH_THIS_USERNAME",
                "status": "error",
            }, status=HTTP_404_NOT_FOUND)

        user = User.objects.get(username=username)

        if not user.is_verified:
            return Response(data={
                "title": "ACCOUNT_NOT_VERIFIED",
                "message": "ACCOUNT_NOT_VERIFIED_YET",
                "status": "info"
            }, status=HTTP_403_FORBIDDEN)

        password = request.data.get("password")

        if not user.check_password(raw_password=password):
            return Response(data={
                "title": "INCORRECT_PASSWORD",
                "message": "ENTERED_PASSWORD_IS_INCORRECT",
                "status": "error",
            }, status=HTTP_400_BAD_REQUEST)

        serialized_user = UserSerializer(instance=user).data

        response = Response(
            data=serialized_user,
            status=HTTP_200_OK,
        )

        token = RefreshToken.for_user(user=user)

        response.set_cookie(
            key="auth_token",
            value=str(token.access_token),
            httponly=True,
            secure=False,
            samesite=None,
            max_age=15 * 60,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(token),
            httponly=True,
            secure=False,
            samesite="None",
            max_age=7 * 24 * 60 * 60,
        )

        return response
