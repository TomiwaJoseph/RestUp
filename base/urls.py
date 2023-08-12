from django.urls import path, re_path
from base.views import index, get_apartment, reserve_room

urlpatterns = [
    path('', index),
    path('apartments', index),
    path('apartments/<slug:slug>', get_apartment),
    path('reserve-room/<slug:apartment_slug>/<slug:room_slug>', reserve_room),
    path('restaurant', index),
    path('about', index),
    path('login', index),
    path('user/dashboard', index),
    path('sign-up', index),
    path('contact-us', index),
    re_path(r'^.*/$', index),
]
