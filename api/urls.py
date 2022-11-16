from django.urls import path, include
from . import views

urlpatterns = [
    path('rooms/<slug:slug>/', views.get_highest_price)
]
