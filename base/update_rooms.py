from datetime import timedelta
from django.utils import timezone
from users.models import Booking


# this function runs every 30 minutes
def check_and_update_rooms():
    # get all expired dates
    all_expired_rooms = [obj.room for obj in Booking.objects.all(
    ) if obj.end_date < timezone.now() and not obj.room.availability]

    if all_expired_rooms:
        for obj in all_expired_rooms:
            obj.availability = True
            obj.save()
