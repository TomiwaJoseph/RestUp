from rest_framework import serializers
from base.models import Apartment, Room, ApartmentImages


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['id', 'name', 'slug', 'main_image']


# class RoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = ['id', 'name', 'slug', 'main_image']
