from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from . models import Product
from . serializers import  ProductSerializer
from backend.pagination import CustomPagiantion


@api_view(['GET'])
def get_products(request):
  products = Product.objects.all()
  pagination = CustomPagiantion()
  paginated_products = pagination.paginate_queryset(products, request)
  serializer = ProductSerializer(paginated_products, many=True)
  return pagination.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_Product(request, name):
  product = Product.objects.get(name=name)
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def create_product(request):
  if request.user.is_staff:
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user=request.user)      
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
  else:
    return Response(True, status=status.HTTP_401_UNAUTHORIZED)
  
@api_view(['PUT'])
def edit_product(request, pk):
  product = Product.objects.get(id=pk)
  if request.user.is_staff:
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
  else:
    return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
  

@api_view(['DELETE'])
def delet_product(request, pk):
  product = Product.objects.get(id=pk)
  if request.user.is_staff:
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  else:
    return Response(status=status.HTTP_401_UNAUTHORIZED)