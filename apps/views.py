from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import get_template
from django.template import TemplateDoesNotExist
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Photo
from .serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing photos
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get_queryset(self):
        """Filter photos by user if authenticated"""
        queryset = Photo.objects.all()
        user = self.request.user
        if user.is_authenticated:
            queryset = queryset.filter(user=user)
        return queryset

    def perform_create(self, serializer):
        """Save user when creating photo"""
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

    @action(detail=False, methods=['delete'])
    def delete_all(self, request):
        """Delete all photos"""
        count = self.get_queryset().count()
        self.get_queryset().delete()
        return Response({
            'message': f'{count} ta rasm o\'chirildi',
            'deleted_count': count
        })


def index(request):
    """Main page view"""
    # Bir necha template manzillarini tekshirish
    template_paths = [
        'gallery/index.html',
        'index.html',
        'apps/index.html',
        'apps/templates/index.html',
    ]

    for template_path in template_paths:
        try:
            get_template(template_path)
            return render(request, template_path)
        except TemplateDoesNotExist:
            continue

    # Agar hech qanday template topilmasa, xato qaytarish
    return JsonResponse({
        'error': 'Template topilmadi',
        'tried_paths': template_paths,
        'instruction': 'Iltimos, index.html faylni templates/gallery/ papkasiga joylashtiring'
    }, status=404)


def upload_photo(request):
    """Upload photo view"""
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        title = request.POST.get('title', '')
        description = request.POST.get('description', '')

        photo = Photo.objects.create(
            image=image,
            title=title,
            description=description,
            user=request.user if request.user.is_authenticated else None
        )

        return JsonResponse({
            'success': True,
            'photo': {
                'id': photo.id,
                'title': photo.title,
                'image_url': photo.image.url,
                'uploaded_at': photo.uploaded_at.isoformat()
            }
        })

    return JsonResponse({'success': False, 'error': 'Rasm topilmadi'})