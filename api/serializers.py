from rest_framework import serializers
from base.models import Apartment, Room


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['id', 'name', 'slug', 'main_image']


class RoomSerializer(serializers.ModelSerializer):
    room_info = serializers.SerializerMethodField()
    room_extras = serializers.SerializerMethodField()

    def get_room_info(self, obj):
        return obj.room_info.all().values_list('info', flat=True)

    def get_room_extras(self, obj):
        return obj.room_extras.all().values_list('extra', flat=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'slug', 'max_people', 'price',
                  'bed_type', 'size', 'refundable', 'room_info', 'room_extras']
