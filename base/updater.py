from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .update_rooms import check_and_update_rooms


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        check_and_update_rooms,
        trigger='cron',
        hour=12
    )
    scheduler.start()
