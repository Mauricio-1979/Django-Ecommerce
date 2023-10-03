from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from . models import User
from . serializers import RegisterUserSerializer, MyTokenObtainPairSerializer, UserSerializer

@api_view(['GET'])
def get_users(request):
  if request.user.is_staff:
    users = User.objects.exclude(email='mauricio@gmail.com')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
  return Response(status=status.HTTP_401_UNAUTHORIZED)

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


@api_view(['DELETE'])
def delete_user(request, pk):
  if request.user.is_staff:
    user = User.objects.get(pk=pk)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def search_user(request):
  query = request.query_params.get('query')
  if query is None:
    query = ''
  user = User.objects.filter(email__icontains=query)
  serializer = UserSerializer(user, many=True)
  return Response({'users': serializer.data})