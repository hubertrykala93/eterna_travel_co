import os

from django.core.mail import EmailMultiAlternatives
from django.db import transaction
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.response import Response
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from .serializers import ContactUsSerializer


class ContactUsAPIView(APIView):
    def put(self, request):
        serializer = ContactUsSerializer(data=request.data)

        if serializer.is_valid():
            try:
                with transaction.atomic():
                    contact_message = serializer.save()
                    email = contact_message.email

                    html_message = render_to_string(
                        template_name="contact/contact-message.html",
                        context={
                            "message": contact_message,
                        },
                        request=request
                    )

                    plain_message = strip_tags(html_message)

                    message = EmailMultiAlternatives(
                        subject="Message from Eterna Travel Co.",
                        body=plain_message,
                        from_email=os.environ.get("EMAIL_FROM"),
                        to=[email],
                    )

                    message.attach_alternative(content=html_message, mimetype="text/html")
                    message.send()

                    return Response(status=HTTP_200_OK)

            except Exception:
                return Response(data={
                    "title": "UNEXPECTED_ERROR",
                    "message": "PLEASE_TRY_AGAIN_LATER",
                    "status": "error"
                }, status=HTTP_400_BAD_REQUEST)

        return Response(data={
            "title": "INVALID_DATA",
            "message": "PROVIDED_USER_DATA_IS_NOT_VALID",
            "status": "error"
        }, status=HTTP_500_INTERNAL_SERVER_ERROR)
