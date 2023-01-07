from datetime import timedelta
from django.utils import timezone
from users.models import Booking


def check_and_update_rooms():
    # this function runs every day at 12:00PM
    print()
    print("This function runs every 1 minutes")
    # get all expired dates
    all_expired_rooms = [obj.room for obj in Booking.objects.all(
    ) if obj.end_date < timezone.now() and not obj.room.availability]

    if all_expired_rooms:
        # print(all_expired_rooms)
        for obj in all_expired_rooms:
            # print('changing the availability...')
            obj.availability = True
            obj.save()
    else:
        print('No dates are expired')
    print()
