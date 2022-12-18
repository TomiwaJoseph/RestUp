from rest_framework import serializers
from django.contrib.auth import get_user_model
from base.models import Apartment, Room

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
