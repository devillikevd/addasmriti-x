from rest_framework import serializers
from .models import Memory, DigitalTwin, Community


class MemorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = '__all__'
        read_only_fields = ('id', 'view_count', 'like_count', 'share_count', 'created_at', 'updated_at')


class MemoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ('id', 'title', 'content', 'memory_type', 'time_period', 'emotion_tags',
                  'language', 'images', 'audio_url', 'cultural_significance', 'like_count',
                  'view_count', 'is_public', 'preservation_status', 'created_at')


class DigitalTwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalTwin
        fields = '__all__'
        read_only_fields = ('id', 'created_at')


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('id', 'member_count', 'memory_count', 'created_at')
