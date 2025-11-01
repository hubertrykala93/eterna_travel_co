from django.contrib import admin
from .models import User


@admin.register(User)
class AdminUser(admin.ModelAdmin):
    list_display = [
        "id",
        "creation_timestamp",
        "modification_timestamp",
        "username",
        "email",
        "phone_number",
        "avatar",
        "language",
        "currency",
        "is_verified",
        "is_staff",
        "is_superuser"
    ]
