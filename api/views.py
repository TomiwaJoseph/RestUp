import math
import os
import random
import string
import stripe
from base.models import Apartment, Room, RoomInfo, RoomExtra, ApartmentImages
from users.models import Booking, CustomUser
from datetime import timedelta, time
from django.db.models import Q
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.core.files import File
from django.utils import timezone
from random import shuffle, choice, choices, seed, sample
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
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=25))


images_path = r'C:\Users\dretech\Documents\bluetooth\apartments'
all_images = []
for root, dirnames, filenames in os.walk(images_path):
    for file in filenames:
        all_images.append(file)
shuffle(all_images)

apartment_names = [
    "Tyndall Lodge", "Pierce Boutique", "Imperial Suites",
    "Tyne Valley", "Clonmel Castle", "Fuller Lake Suites",
    "Casa Vignole", "Villars Bristol", "Grandhouse Suites",
    "Do-Multiply Suites", "Addition Express", "Morgana Suites",
    "365 Winthrop", "Jazzy Grande", "Presidio Suites",
    "Pelican Cove", "Springmain Hill", "Coral Suites",
    "Harbour Beach", "Northern Slope", "Cobblestone Arena",
    "Kaimana Resort", "Relax Rentals", "Escapio Suites",
    "White Blood", "Kona Slope", "Magic Arena",
    "Pagoda Castle", "Sandfront Inn", "Waikiki Arena",
    "Pearl Castle", "Honolulu Inn", "Moana Arena",
    "Kauia Grande", "Royal Groove", "Hilton Garden",
]
BED_TYPES = [
    ("1 full bed", "1 full bed"),
    ("2 queen beds", "2 queen beds"),
    ("2 full beds", "2 full beds"),
    ("1 small bed", "1 small bed"),
    ("King size bed", "King size bed"),
    ("2 small beds", "2 small beds"),
]
ROOM_EXTRAS = [
    "Free toileteries",
    "Socket near the bed",
    "Refrigerator",
    "Ironing facilities",
    "Tea/Coffee maker",
    "Laptop safe",
]
ROOM_INFO = [
    "Air conditioning",
    "Flat-screen TV",
    "Soundproof",
    "Free WiFi",
]


def create_all():
    for info in ROOM_INFO:
        room_info = RoomInfo.objects.create(
            info=info
        )
        room_info.save()
    for extra in ROOM_EXTRAS:
        room_extra = RoomExtra.objects.create(
            extra=extra
        )
        room_extra.save()

    for name in apartment_names:
        main_image = all_images[0]
        q = Apartment.objects.create(
            name=name,
        )
        q.save()
        image_path = r"C:\Users\dretech\Documents\bluetooth\apartments\{}".format(
            main_image)
        with open(image_path, 'rb') as f:
            image_file = File(f)
            q.main_image.save(main_image, image_file, True)

        random_images = sample(all_images, k=3)
        for i in random_images:
            apartment_image = ApartmentImages.objects.create(
                apartment=q,
            )
            apartment_image.save()
            image_path = r"C:\Users\dretech\Documents\bluetooth\apartments\{}".format(
                i)
            with open(image_path, 'rb') as f:
                image_file = File(f)
                apartment_image.image.save(i, image_file, True)

        all_images.remove(main_image)
        number_of_rooms = choice([2, 3])

        for i in range(number_of_rooms):
            number_of_people = choice([i for i in range(1, 7)])
            bed_types = choice(BED_TYPES)
            size = choice([i for i in range(22, 44, 2)])
            refundable = choice([True, False])
            room_info_size = choice([2, 3, 4])
            room_extra_size = choice([4, 5, 6])
            price = choice([i for i in range(120, 420, 20)])

            room = Room(
                apartment=q,
                name="Apartment Room " + str(i+1),
                max_people=number_of_people,
                price=price,
                bed_type=bed_types[0],
                size=size,
                # booked_start_date=timezone.now(),
                # booked_end_date=timezone.now(),
                refundable=refundable,
            )
            room.save()

            info_choice = choices(
                list(RoomInfo.objects.all()), k=room_info_size)
            extra_choice = choices(
                list(RoomExtra.objects.all()), k=room_extra_size)
            for info in info_choice:
                room.room_info.add(info)
            for extra in extra_choice:
                room.room_extras.add(extra)


# create_all()
@api_view(['GET'])
def get_apartments(request):
    data = list(Apartment.objects.all())
    sys_random = random.SystemRandom()
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

    # serializer = ApartmentSerializer(single_apartment).data
    new_serializer = {
        "apartment_name": single_apartment.name,
        "all_apartment_images": all_images,
        "room_details": room_serializer,
    }
    # new_serializer.update(serializer)
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
    sys_random = random.SystemRandom()
    random_image = sys_random.choice(data)

    return Response({
        "booked_room_info": booking_serializer,
        "random_dashboard_image": random_image.main_image.url,
    })


@api_view(['POST'])
def cancel_booking(request):
    # print()
    # return Response({'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
    # booking_ref_code = request.data.get('ref')
    # token = request.data.get('token')
    # print(booking_ref_code)
    # print(token)
    # return Response(status=status.HTTP_200_OK)

    booking_ref_code = request.data.get('ref')
    token = request.data.get('token')
    try:
        token = Token.objects.get(key=token)
        # print(token.user)
        # print(request.user)
        if token.user != request.user:
            # print('bad token user')
            raise Token.DoesNotExist
        ref_code_query = Booking.objects.get(ref_code=booking_ref_code)
        if ref_code_query.user != request.user:
            # print('bad user')
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if timezone.now().time() <= time(23, 59):
            ref_code_query.delete()
            # Refund user and delete the booking
            # goes here

        all_user_bookings = Booking.objects.filter(
            user=token.user
        )
        booking_serializer = BookingSerializer(
            list(all_user_bookings), many=True).data
        data = list(Apartment.objects.all())
        sys_random = random.SystemRandom()
        random_image = sys_random.choice(data)
        return Response({
            "booked_room_info": booking_serializer,
            "random_dashboard_image": random_image.main_image.url,
        })
    except Token.DoesNotExist:
        # print('bad token')
        return Response({'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
    except Booking.DoesNotExist:
        # print('bad booking')
        return Response({'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = User.objects.get(auth_token=token)
    user.auth_token.delete()
    data = {'success': 'Successfully logged out.'}
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['GET'])
def login_demo_user(request):
    query_user = CustomUser.objects.filter(email='demouser@gmail.com')
    if not query_user:
        user = CustomUser.objects.create(
            email='demouser@gmail.com',
            first_name='Demo',
            last_name='User',
            password='a'
        )
        token = Token.objects.get_or_create(user=user)
    else:
        user = query_user[0]

    return Response({
        'user_info': {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        },
        'token': user.auth_token.key
    })


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
        # print('Status is: %s' % e.http_status)
        # print('Type is: %s' % err.get('type'))
        # print('Code is: %s' % err.get('code'))
        # print('Message is %s' % err.get('message'))
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
