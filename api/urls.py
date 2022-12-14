from django.urls import path, include
from . import views

urlpatterns = [
    path('test-page/', views.test_page),
    path('apartments/', views.get_apartments),
    path('filtered-apartments/', views.filtered_apartments),
    path('featured-apartments/', views.get_featured_apartments),
    path('highest-price-size-and-capacity/', views.get_highest_price_size_and_capacity),
    path('apartment/<slug:slug>/', views.get_single_apartment),
    # AUTHENTICATION URLS
    path('auth/login/', views.LoginView.as_view(), name='login'),
    # path('auth/register/', views.RegisterView.as_view(), name='register'),
    # path('login-demo-user/', views.login_demo_user, name='demo-login'),
    # path('auth/logout/', views.logout),
    # path('auth/user/', views.fetch_user, name='fetch_user'),
    # STRIPE URL
    path('save-stripe-info/', views.save_stripe_info),
]
