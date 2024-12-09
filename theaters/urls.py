from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, TheaterViewSet, ScreenViewSet, MovieViewSet, ShowViewSet

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'theaters', TheaterViewSet)
router.register(r'screens', ScreenViewSet)
router.register(r'movies', MovieViewSet)
router.register(r'shows', ShowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]