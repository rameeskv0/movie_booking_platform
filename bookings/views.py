from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='book-seats', url_name='book_seats')
    def book_seats(self, request):
        show_id = request.data.get('showId')
        seats = request.data.get('seats')
        
        if not show_id:
            return Response(
                {'error': 'showId is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            show_id = int(show_id)  # Ensure show_id is an integer
            
            # Check if seats are already booked
            existing_bookings = Booking.objects.filter(
                show_id=show_id
            )
            
            # Check if any of the requested seats are already booked
            for booking in existing_bookings:
                if any(seat in booking.booked_seats for seat in seats):
                    return Response(
                        {'error': 'Some seats are already booked'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Create new booking
            booking = Booking.objects.create(
                show_id=show_id,
                user=request.user,
                number_of_seats=len(seats),
                booked_seats=seats,
                status='CONFIRMED',
                total_amount=0
            )

            return Response(
                {'message': 'Seats booked successfully'},
                status=status.HTTP_200_OK
            )

        except ValueError:
            return Response(
                {'error': 'Invalid show ID'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Error creating booking: {str(e)}")  # Debug log
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'], url_path='booked-seats')
    def get_booked_seats(self, request):
        show_id = request.query_params.get('showId')
        if not show_id:
            return Response(
                {'error': 'showId is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            bookings = Booking.objects.filter(show_id=show_id)
            booked_seats = []
            for booking in bookings:
                booked_seats.extend(booking.booked_seats)
            
            return Response({
                'bookedSeats': booked_seats
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )