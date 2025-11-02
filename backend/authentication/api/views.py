from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from ..models import User


class UsersAPIView(APIView):
    def put(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        if User.objects.filter(email=request.data.get("email")).exists():
            return Response(data={
                "title": "EMAIL_EXISTS",
                "message": "USER_WITH_THIS_EMAIL_ALREADY_EXISTS",
                "status": "error"
            }, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=request.data.get("username")).exists():
            return Response(data={
                "title": "USERNAME_EXISTS",
                "message": "USER_WITH_THIS_USERNAME_ALREADY_EXISTS",
                "status": "error",
            })

        if request.data.get("password") != request.data.get("repassword"):
            return Response(data={
                "title": "PASSWORDS_DO_NOT_MATCH",
                "message": "PASSWORDS_ARE_NOT_IDENTICAL",
                "status": "error"
            })

        if serializer.is_valid():
            serializer.save()

            return Response()



