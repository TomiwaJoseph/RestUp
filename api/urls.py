from django.urls import path, include
from . import views

urlpatterns = [
    path('test-page/', views.test_page)
]
