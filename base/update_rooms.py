from datetime import timedelta
from django.utils import timezone


def check_and_update_rooms():
    print()
    print("This function runs every day at 12:00PM")
    # new_date = timezone.now() + timedelta(days=stay_duration)
    # end_date = new_date.replace(hour=12, minute=00)

    # print(end_date)
    # print(type(end_date))
    # print(end_date > timezone.now())
    # print(end_date < timezone.now())
    # print()
