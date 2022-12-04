from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Apartment, Room, RoomInfo, RoomExtra, ApartmentImages
from random import shuffle, choice, choices
import os
from django.core.files import File
from .serializers import ApartmentSerializer


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

        random_images = choices(all_images, k=3)
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
        number_of_people = choice([i for i in range(1, 7)])
        price = choice([i for i in range(120, 420, 20)])
        bed_types = choice(BED_TYPES)
        size = choice([i for i in range(22, 44, 2)])
        refundable = choice([True, False])
        room_info_size = choice([2, 3, 4])
        room_extra_size = choice([4, 5, 6])

        for i in range(number_of_rooms):
            room = Room(
                apartment=q,
                name="Room"+str(i+1),
                max_people=number_of_people,
                price=price,
                bed_type=bed_types[0],
                size=size,
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
def test_page(request):
    data = [str(i) for i in range(1, 6)]
    return Response(data)


@api_view(['GET'])
def get_apartments(request):
    data = [str(i) for i in range(1, 9)]
    return Response(data)


@api_view(['POST'])
def filtered_apartments(request):
    # # Get the values passed in the request parameters
    startDate = request.data.get('startDate')
    endDate = request.data.get('endDate')
    priceMinValue = request.data.get('priceMinValue')
    priceMaxValue = request.data.get('priceMaxValue')
    capacityMinValue = request.data.get('capacityMinValue')
    capacityMaxValue = request.data.get('capacityMaxValue')
    print(startDate)
    print(endDate)
    print(priceMinValue)
    print(priceMaxValue)
    print(capacityMinValue)
    print(capacityMaxValue)

    data = [str(i) for i in range(1, 4)]
    return Response(data)


@api_view(['GET'])
def get_featured_apartments(request):
    data = [str(i) for i in range(1, 4)]
    return Response(data)


@api_view(['GET'])
def get_highest_price_and_capacity(request):
    data = [str(i) for i in "320 6".split(" ")]
    return Response(data)


@api_view(['GET'])
def get_single_apartment(request, slug):
    data = [str(i) for i in "320 6".split(" ")]
    return Response(data)

# @api_view(['POST'])
# def filter_apartments(request):
#     data = [str(i) for i in "320 6".split(" ")]
#     return Response(data)


@api_view(['POST'])
def save_stripe_info(request):
    pass
