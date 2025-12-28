from rest_framework import serializers

from ..models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "creation_timestamp",
            "avatar",
            "password",
            "currency",
            "email",
            "is_verified",
            "language",
            "last_login",
            "modification_timestamp",
            "phone_number",
            "username"
        ]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)

        if password:
            user.set_password(raw_password=password)

        user.save()

        return user
