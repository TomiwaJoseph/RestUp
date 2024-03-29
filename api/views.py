import math
import string
import stripe
from base.models import Apartment, Room
from users.models import Booking
from datetime import timedelta, time
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.utils import timezone
from random import shuffle,  choices, seed, SystemRandom
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import ApartmentSerializer, RoomSerializer, RegisterSerializer, BookingSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY
User = get_user_model()


def create_ref_code():
    return "".join(choices(string.ascii_lowercase + string.digits, k=25))


@api_view(['GET'])
def get_apartments(request):
    data = list(Apartment.objects.all())
    sys_random = SystemRandom()
    random_image = sys_random.choice(data)

    # Get apartments with at least 1 free room
    all_rooms = Room.objects.filter(
        availability=True
    )
    apartment_with_available_rooms = list(
        set([room.apartment for room in all_rooms]))
    seed(10)
    shuffle(apartment_with_available_rooms)
    serializer = ApartmentSerializer(
        apartment_with_available_rooms, many=True).data
    new_serializer = list(serializer)
    new_serializer.append(random_image.main_image.url)
    return Response(new_serializer, status=status.HTTP_200_OK)


@api_view(['POST'])
def filtered_apartments(request):
    # Get the values passed in the request parameters
    sizeMinValue = request.data.get('sizeMinValue')
    sizeMaxValue = request.data.get('sizeMaxValue')
    priceMinValue = request.data.get('priceMinValue')
    priceMaxValue = request.data.get('priceMaxValue')
    capacityMinValue = request.data.get('capacityMinValue')
    capacityMaxValue = request.data.get('capacityMaxValue')

    room_query = Room.objects.filter(
        size__gte=sizeMinValue,
        size__lte=sizeMaxValue,
        price__gte=priceMinValue,
        price__lte=priceMaxValue,
        max_people__gte=capacityMinValue,
        max_people__lte=capacityMaxValue,
        availability=True,
    )
    search_results = list(set([room.apartment for room in room_query]))
    serializer = ApartmentSerializer(search_results, many=True).data
    return Response(serializer)


@api_view(['GET'])
def get_featured_apartments(request):
    data = list(set([room.apartment for room in Room.objects.filter(
        availability=True) if room.availability]))
    serializer = ApartmentSerializer(choices(data, k=3), many=True).data
    return Response(serializer)


@api_view(['GET'])
def get_highest_price_size_and_capacity(request):
    all_room_size = [obj.size for obj in Room.objects.all()]
    highest_price = max([obj.price for obj in Room.objects.all()])
    highest_capacity = max([obj.max_people for obj in Room.objects.all()])
    data = {
        "min_size": min(all_room_size),
        "max_size": max(all_room_size),
        "highest_price": highest_price,
        "highest_capacity": highest_capacity
    }
    return Response(data)


@api_view(['GET'])
def get_single_apartment(request, slug):
    # Get apartment images
    try:
        single_apartment = Apartment.objects.get(slug=slug)
        other_images = [
            apartment.image.url for apartment in single_apartment.related_images.all()]
        all_images = [single_apartment.main_image.url] + other_images
    except Apartment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Available Rooms
    available_rooms = Room.objects.filter(
        apartment=single_apartment,
        availability=True
    )
    room_serializer = RoomSerializer(
        list(available_rooms), many=True).data

    new_serializer = {
        "apartment_name": single_apartment.name,
        "apartment_hero": all_images[0],
        "other_apartment_images": all_images[1:],
        "room_details": room_serializer,
    }
    return Response(new_serializer, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_single_room(request):
    apartment_slug = request.data.get('apartmentSlug')
    room_slug = request.data.get('roomSlug')

    # Get Room
    try:
        single_room = Room.objects.get(
            apartment__slug=apartment_slug,
            slug=room_slug,
        )
        if not single_room.availability:
            return Response(status=status.HTTP_404_NOT_FOUND)
    except Room.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    new_serializer = {
        "room_price": single_room.price,
        "room_image": single_room.apartment.main_image.url,
    }
    return Response(new_serializer, status=status.HTTP_200_OK)


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'user': serializer.data,
        })


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            return Response({
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                'token': user.auth_token.key
            })
        return Response({"error": 'Wrong Credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_bookings(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
        if token.user != request.user:
            raise Token.DoesNotExist
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    all_user_bookings = Booking.objects.filter(
        user=token.user
    )
    booking_serializer = BookingSerializer(
        list(all_user_bookings), many=True).data
    data = list(Apartment.objects.all())
    sys_random = SystemRandom()
    random_image = sys_random.choice(data)

    return Response({
        "booked_room_info": booking_serializer,
        "random_dashboard_image": random_image.main_image.url,
    })


@api_view(['POST'])
def cancel_booking(request):
    booking_ref_code = request.data.get('ref')
    token = request.data.get('token')
    try:
        token = Token.objects.get(key=token)
        if token.user != request.user:
            raise Token.DoesNotExist
        ref_code_query = Booking.objects.get(ref_code=booking_ref_code)
        if ref_code_query.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if timezone.now().time() <= time(23, 59):
            # Make room available
            the_room = ref_code_query.room
            the_room.availability = True
            the_room.save()
            # Delete booking
            ref_code_query.delete()
            # Refund user logic goes below

        all_user_bookings = Booking.objects.filter(
            user=token.user
        )
        booking_serializer = BookingSerializer(
            list(all_user_bookings), many=True).data
        data = list(Apartment.objects.all())
        sys_random = SystemRandom()
        random_image = sys_random.choice(data)
        return Response({
            "booked_room_info": booking_serializer,
            "random_dashboard_image": random_image.main_image.url,
        })
    except Token.DoesNotExist:
        return Response({'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
    except Booking.DoesNotExist:
        return Response({'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = User.objects.get(auth_token=token)
    if not user.email == 'demouser@gmail.com':
        user.auth_token.delete()
    data = {'success': 'Successfully logged out.'}
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['GET'])
def login_demo_user(request):
    try:
        user = User.objects.get(email='demouser@gmail.com')
        return Response({
            'user_info': {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            },
            'token': user.auth_token.key
        })
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def fetch_user(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    response = {
        "first_name": token.user.first_name,
        "last_name": token.user.last_name,
        "email": token.user.email,
        'ok': True,
    }

    return Response(response)


@api_view(['GET'])
def check_authentication(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response({'authenticated': False})

    return Response({'authenticated': True})


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    payment_method_id = data['payment_method_id']
    email = data['email']
    amount = math.ceil(data['amount'])
    user_info = data['userInfo']
    stay_duration = int(data['stayDuration'])
    room_apartment_slug = data['roomApartmentSlug']
    token = data['token']

    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
    else:
        customer = customer_data[0]

    try:
        # creating paymentIntent
        payment_intent = stripe.PaymentIntent.create(
            customer=customer,
            payment_method=payment_method_id,
            currency='usd',
            amount=amount*100,
            confirm=True
        )

        # Only confirm an order after you have status: succeeded
        # should be succeeded
        if payment_intent['status'] == 'succeeded':
            restup_user = User.objects.get(auth_token=token)
            room = Room.objects.get(
                apartment__slug=room_apartment_slug[1],
                slug=room_apartment_slug[0],
            )

            new_date = timezone.now() + timedelta(days=stay_duration)
            end_date = new_date.replace(hour=12, minute=00)

            # create new booking for room
            new_booking = Booking.objects.create(
                user=restup_user,
                room=room,
                occupant_first_name=user_info[0],
                occupant_last_name=user_info[1],
                occupant_email=user_info[2],
                occupant_phone_number=user_info[3],
                stay_duration=stay_duration,
                ref_code=create_ref_code(),
                start_date=timezone.now(),
                end_date=end_date
            )
            # make the room unavailable
            room.availability = False
            room.save()

            return Response(status=status.HTTP_200_OK, data={
                'message': 'Success',
            })
        else:
            raise stripe.error.CardError

    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get('error', {})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': err.get('message')
        })
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': "The API was not able to respond, try again."
        })
    except stripe.error.InvalidRequestError as e:
        # invalid parameters were supplied to Stripe's API
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': "Invalid parameters, unable to process payment."
        })
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        pass
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Network communication failed, try again.'
        })
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Internal Error, contact support.'
        })
    # Something else happened, completely unrelated to Stripe
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Unable to process payment, try again.'
        })
