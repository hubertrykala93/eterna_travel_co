from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ContactUsSerializer


class ContactUsAPIView(APIView):
    def put(self, request):
        serializer = ContactUsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response()

        return Response(
            data=serializer.errors
        )
