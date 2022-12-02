from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test_page(request):
    data = [str(i) for i in range(1,6)]
    return Response(data)

@api_view(['GET'])
def get_featured_apartments(request):
    data = [str(i) for i in range(1,6)]
    return Response(data)

@api_view(['GET'])
def get_highest_price_and_capacity(request):
    data = [str(i) for i in "320 6".split(" ")]
    return Response(data)

@api_view(['GET'])
def get_single_apartment(request, slug):
    data = [str(i) for i in "320 6".split(" ")]
    return Response(data)

@api_view(['POST'])
def filter_apartments(request):
    data = [str(i) for i in "320 6".split(" ")]
    return Response(data)

@api_view(['POST'])
def save_stripe_info(request):
    pass