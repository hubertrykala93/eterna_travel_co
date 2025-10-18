from rest_framework import serializers
from ..models import ContactUs


class ContactUsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=64,
        required=True,
        allow_blank=False,
        help_text="Full name of the sender.",
    )
    email = serializers.EmailField(
        max_length=64,
        required=True,
        allow_blank=False,
        help_text="Valid email address of the sender.",
    )
    message = serializers.CharField(
        max_length=1000,
        required=True,
        allow_blank=False,
        help_text="Message content provided by the user.",
    )

    class Meta:
        model = ContactUs
        fields = "__all__"
