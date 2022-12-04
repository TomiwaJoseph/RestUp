from django.urls import path, include
from . import views

urlpatterns = [
    path('test-page/', views.test_page),
    path('apartments/', views.get_apartments),
    path('filtered-apartments/', views.filtered_apartments),
    path('featured-apartments/', views.get_featured_apartments),
    path('highest-price-and-capacity/', views.get_highest_price_and_capacity),
    path('apartment/<slug:slug>/', views.get_single_apartment),
    path('save-stripe-info/', views.save_stripe_info),
]
