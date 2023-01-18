from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def get_apartment(request, slug):
    return render(request, 'index.html')


def reserve_room(request, apartment_slug, room_slug):
    return render(request, 'index.html')
