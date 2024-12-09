from django.contrib import admin
from .models import Location, Theater, Screen, Movie, Show

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'country', 'created_at')
    search_fields = ('name', 'city', 'state', 'country')
    list_filter = ('state', 'country')

@admin.register(Theater)
class TheaterAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'address', 'created_at')
    search_fields = ('name', 'address', 'location__city')
    list_filter = ('location__city',)

@admin.register(Screen)
class ScreenAdmin(admin.ModelAdmin):
    list_display = ('name', 'theater', 'seating_capacity', 'created_at')
    search_fields = ('name', 'theater__name')
    list_filter = ('theater__location__city', 'seating_capacity')

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'duration', 'created_at')
    search_fields = ('title', 'description', 'language')
    list_filter = ('language',)

@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = ('movie', 'screen', 'show_time', 'price', 'created_at')
    search_fields = ('movie__title', 'screen__name')
    list_filter = ('screen__theater__location__city', 'movie', 'show_time')