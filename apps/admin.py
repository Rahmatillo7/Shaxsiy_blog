from django.contrib import admin
from .models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    """Photo admin configuration"""
    list_display = ['id', 'title', 'image_thumbnail', 'uploaded_at', 'user']
    list_filter = ['uploaded_at', 'user']
    search_fields = ['title', 'description']
    readonly_fields = ['image_preview', 'uploaded_at', 'updated_at']

    def image_thumbnail(self, obj):
        """Show small thumbnail in list"""
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />'
        return '-'

    image_thumbnail.short_description = 'Rasm'
    image_thumbnail.allow_tags = True

    def image_preview(self, obj):
        """Show larger preview in detail view"""
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-width: 500px; max-height: 500px; border-radius: 10px;" />'
        return '-'

    image_preview.short_description = 'Rasm ko\'rinishi'
    image_preview.allow_tags = True
