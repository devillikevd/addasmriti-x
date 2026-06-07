from django.db import models
import uuid


class Memory(models.Model):
    MEMORY_TYPES = [
        ('story','Story'),('event','Event'),('tradition','Tradition'),
        ('recipe','Recipe'),('festival','Festival'),('personal','Personal'),
        ('historical','Historical'),('song','Song'),('poem','Poem'),
    ]
    LANGUAGES = [
        ('en','English'),('bn','Bengali'),('hi','Hindi'),('ta','Tamil'),
        ('te','Telugu'),('mr','Marathi'),('pa','Punjabi'),('gu','Gujarati'),
    ]
    STATUSES = [('draft','Draft'),('processing','Processing'),('published','Published'),('archived','Archived')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(db_index=True)
    title = models.CharField(max_length=500)
    content = models.TextField()
    memory_type = models.CharField(max_length=50, choices=MEMORY_TYPES)
    time_period = models.CharField(max_length=100, blank=True)
    exact_date = models.DateField(null=True, blank=True)
    location_name = models.CharField(max_length=255, blank=True)
    location_city = models.CharField(max_length=100, blank=True)
    location_country = models.CharField(max_length=100, default='India')
    location_lat = models.FloatField(null=True, blank=True)
    location_lng = models.FloatField(null=True, blank=True)
    emotion_tags = models.JSONField(default=list)
    people_mentioned = models.JSONField(default=list)
    places_mentioned = models.JSONField(default=list)
    cultural_significance = models.IntegerField(default=5)
    language = models.CharField(max_length=10, choices=LANGUAGES, default='en')
    audio_url = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    images = models.JSONField(default=list)
    transcript = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)
    view_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)
    preservation_status = models.CharField(max_length=50, choices=STATUSES, default='draft')
    is_public = models.BooleanField(default=False)
    embedding_vector = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'memories'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user_id']),
            models.Index(fields=['memory_type']),
            models.Index(fields=['is_public', '-created_at']),
        ]

    def __str__(self):
        return f"{self.title} ({self.memory_type})"


class DigitalTwin(models.Model):
    STATUSES = [('pending','Pending'),('training','Training'),('completed','Completed'),('failed','Failed')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(unique=True, db_index=True)
    twin_name = models.CharField(max_length=255)
    voice_model_id = models.CharField(max_length=255, blank=True)
    personality_profile = models.JSONField(default=dict)
    speaking_style = models.JSONField(default=dict)
    dialect_features = models.JSONField(default=dict)
    memory_count = models.PositiveIntegerField(default=0)
    training_status = models.CharField(max_length=50, choices=STATUSES, default='pending')
    model_version = models.CharField(max_length=20, blank=True)
    last_trained_at = models.DateTimeField(null=True, blank=True)
    avatar_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'digital_twins'

    def __str__(self):
        return self.twin_name


class Community(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    community_type = models.CharField(max_length=50)
    location_city = models.CharField(max_length=100, blank=True)
    cover_image = models.URLField(blank=True)
    member_count = models.PositiveIntegerField(default=0)
    memory_count = models.PositiveIntegerField(default=0)
    privacy = models.CharField(max_length=20, default='public')
    created_by = models.UUIDField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'communities'

    def __str__(self):
        return self.name
