from django.db import models
from uuid import uuid4


class ContactUs(models.Model):
    id = models.UUIDField(unique=True, default=uuid4, editable=False, primary_key=True)
    creation_timestamp = models.DateTimeField(auto_now_add=True)
    modification_timestamp = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    message = models.CharField(max_length=1000)

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"
        ordering = ["-creation_timestamp"]

    def __str__(self):
        return str(self.email)
