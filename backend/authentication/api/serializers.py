from rest_framework.serializers import ModelSerializer

from ..models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "creation_timestamp",
            "avatar",
            "currency",
            "email",
            "is_verified",
            "language",
            "last_login",
            "modification_timestamp",
            "phone_number",
            "username"
        ]
