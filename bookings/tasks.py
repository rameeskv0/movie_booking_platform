from celery import shared_task
from django.core.mail import send_mail
from .models import Booking

@shared_task
def process_booking(booking_id):
    booking = Booking.objects.get(id=booking_id)
    # Process payment, seat allocation, etc.
    return True

@shared_task
def send_booking_confirmation(booking_id):
    booking = Booking.objects.get(id=booking_id)
    send_mail(
        'Booking Confirmation',
        f'Your booking for {booking.show.movie.title} is confirmed.',
        'from@example.com',
        [booking.user.email],
        fail_silently=False,
    )

@shared_task
def cleanup_expired_bookings():
    # Clean up expired unpaid bookings
    Booking.objects.filter(
        status='PENDING',
        created_at__lte=timezone.now() - timezone.timedelta(minutes=15)
    ).delete()