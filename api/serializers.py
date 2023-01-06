from datetime import datetime, time
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import serializers
from base.models import Apartment, Room
from users.models import Booking

User = get_user_model()


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


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name',
                  'email', 'password']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, email):
        existing_emails = User.objects.filter(email=email).first()
        if existing_emails:
            raise serializers.ValidationError(
                "User with this email already exist. Wasn't you?")
        return email


class BookingSerializer(serializers.ModelSerializer):
    # room_refundable = serializers.SerializerMethodField()
    # room_price = serializers.SerializerMethodField()
    room_name = serializers.SerializerMethodField()
    room_apartment = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()
    spent = serializers.SerializerMethodField()
    show_cancel = serializers.SerializerMethodField()

    def get_show_cancel(self, obj):
        if not obj.room.refundable:
            return False
        elif obj.end_date < timezone.now():
            return False
        elif timezone.now().time() >= time(23, 59):
            return False
        return True

    # def get_room_refundable(self, obj):
    #     return timezone.now().time() <= time(23, 59)

    def get_spent(self, obj):
        return obj.end_date < timezone.now()

    def get_room_name(self, obj):
        return obj.room.name

    def get_room_apartment(self, obj):
        return obj.room.apartment.name

    def get_start_date(self, obj):
        return obj.start_date.strftime('%a, %b %d, %Y')

    def get_end_date(self, obj):
        return obj.end_date.strftime('%a, %b %d, %Y')

    class Meta:
        model = Booking
        fields = [
            'id', 'occupant_first_name', 'ref_code',
            'occupant_last_name', 'occupant_email',
            'occupant_phone_number', 'stay_duration',
            'start_date', 'end_date',
            'room_name', 'room_apartment', 'spent', 'show_cancel'
        ]
