from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Memory, DigitalTwin, Community
from .serializers import MemorySerializer, MemoryListSerializer, DigitalTwinSerializer, CommunitySerializer


class MemoryViewSet(viewsets.ModelViewSet):
    queryset = Memory.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['memory_type', 'language', 'is_public', 'preservation_status']
    search_fields = ['title', 'content', 'people_mentioned', 'places_mentioned']
    ordering_fields = ['created_at', 'like_count', 'view_count', 'cultural_significance']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return MemoryListSerializer
        return MemorySerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return qs.filter(user_id=user_id)
        return qs.filter(is_public=True)

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.view_count += 1
        obj.save(update_fields=['view_count'])
        return Response(self.get_serializer(obj).data)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        obj = self.get_object()
        obj.like_count += 1
        obj.save(update_fields=['like_count'])
        return Response({'like_count': obj.like_count})

    @action(detail=True, methods=['post'])
    def share(self, request, pk=None):
        obj = self.get_object()
        obj.share_count += 1
        obj.save(update_fields=['share_count'])
        return Response({'share_url': f'https://addasmriti.com/memory/{obj.id}', 'share_count': obj.share_count})


class DigitalTwinViewSet(viewsets.ModelViewSet):
    queryset = DigitalTwin.objects.all()
    serializer_class = DigitalTwinSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'location_city']
