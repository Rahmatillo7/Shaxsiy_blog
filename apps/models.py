from django.db import models
from django.contrib.auth.models import User


class Photo(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True, verbose_name="Sarlavha")
    image = models.ImageField(upload_to='photos/%Y/%m/%d/', verbose_name="Rasm")
    description = models.TextField(blank=True, null=True, verbose_name="Tavsif")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Yuklangan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos', null=True, blank=True, verbose_name="Foydalanuvchi")

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = "Rasm"
        verbose_name_plural = "Rasmlar"

    def __str__(self):
        return self.title or f"Rasm #{self.id}"

    @property
    def image_url(self):
        """Rasm URL manzili"""
        if self.image:
            return self.image.url
        return None