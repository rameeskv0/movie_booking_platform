import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('movie_booking')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Add periodic tasks
app.conf.beat_schedule = {
    'cleanup-expired-bookings': {
        'task': 'bookings.tasks.cleanup_expired_bookings',
        'schedule': 3600.0,  # Run every hour
    },
}