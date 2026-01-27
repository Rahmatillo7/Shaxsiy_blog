from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    """Rasm serializer"""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'image_url', 'description', 'uploaded_at', 'updated_at']
        read_only_fields = ['uploaded_at', 'updated_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        elif obj.image:
            return obj.image.url
        return None