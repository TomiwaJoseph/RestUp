from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .update_rooms import check_and_update_rooms


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        check_and_update_rooms,
        'interval',
        minutes=30
    )
    scheduler.start()
