from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . models import User
from . serializers import RegisterUserSerializer, MyTokenObtainPairSerializer


@api_view(["POST"])
def register(request, *args, **kwargs):
  data = request.data
  user = User.objects.create(
    email=data['email'],
    name=data['name'],
    last_name=data['last_name'],
    password=make_password(data['password']),
  )   
  serializer = RegisterUserSerializer(user, many=False)
  print(data)
  return Response(True)
  
class LoginView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer
