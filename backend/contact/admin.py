from django.contrib import admin
from .models import ContactUs


@admin.register(ContactUs)
class AdminContactUs(admin.ModelAdmin):
    list_display = [
        "id",
        "creation_timestamp",
        "modification_timestamp",
        "name",
        "email",
        "message",
    ]

