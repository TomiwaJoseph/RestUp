from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test_page(request):
    data = [str(i) for i in range(1,6)]
    return Response(data)