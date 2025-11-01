from rest_framework.views import APIView
from rest_framework.response import Response


class UsersAPIView(APIView):
    def put(self, request, *args, **kwargs):
        print('Request Data -> ', request.data)
        print('Args -> ', args)
        print('Kwargs -> ', kwargs)

        return Response()
