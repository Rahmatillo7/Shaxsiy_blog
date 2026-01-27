// static/apps/js/main.js

// Constants
const API_URL = '/api/photos/';

// ==========================================
// FILE INPUT
// ==========================================

function setupFileInput() {
    const fileInput = document.getElementById('imageFile');
    const selectedFileDiv = document.getElementById('selectedFile');

    if (fileInput && selectedFileDiv) {
        fileInput.addEventListener('change', (e) => {
            const target = e.target;
            if (target.files && target.files.length > 0) {
                const fileName = target.files[0].name;
                const fileSize = (target.files[0].size / 1024).toFixed(2);
                selectedFileDiv.textContent = `Tanlandi: ${fileName} (${fileSize} KB)`;
                selectedFileDiv.style.display = 'block';
            } else {
                selectedFileDiv.style.display = 'none';
            }
        });
    }
}

// ==========================================
// UPLOAD FORM
// ==========================================

function setupUploadForm() {
    const uploadForm = document.getElementById('uploadForm');

    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }
}

async function handleUpload(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('imageFile');

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        showAlert('Iltimos, rasm tanlang!', 'warning');
        return;
    }

    if (uploadBtn) {
        uploadBtn.disabled = true;
        uploadBtn.textContent = '⏳ Yuklanmoqda...';
    }

    try {
        const csrfToken = getCookie('csrftoken');
        if (!csrfToken) {
            throw new Error('CSRF token topilmadi');
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrfToken
            }
        });

        if (response.ok) {
            showAlert('Rasm muvaffaqiyatli yuklandi! ✅', 'success');
            form.reset();
            const selectedFile = document.getElementById('selectedFile');
            if (selectedFile) {
                selectedFile.style.display = 'none';
            }
            loadPhotos();
        } else {
            const error = await response.json().catch(() => ({ message: 'Rasm yuklanmadi' }));
            showAlert('Xatolik: ' + (error.message || 'Rasm yuklanmadi'), 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showAlert('Xatolik yuz berdi: ' + error.message, 'error');
    } finally {
        if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.textContent = '⬆️ Yuklash';
        }
    }
}

// ==========================================
// LOAD PHOTOS
// ==========================================

function loadPhotos() {
    const gallery = document.getElementById('gallery');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    const statsText = document.getElementById('statsText');

    if (!gallery || !loading || !emptyState || !statsText) {
        console.error('Kerakli elementlar topilmadi');
        return;
    }

    loading.style.display = 'block';
    gallery.style.display = 'none';
    emptyState.style.display = 'none';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Rasmlarni yuklashda xatolik');
            }
            return response.json();
        })
        .then(data => {
            const photos = Array.isArray(data) ? data : (data.results || []);

            loading.style.display = 'none';

            if (photos.length === 0) {
                emptyState.style.display = 'block';
                statsText.textContent = 'Jami rasmlar: 0';
            } else {
                displayPhotos(photos);
                statsText.textContent = 'Jami rasmlar: ' + photos.length;
            }
        })
        .catch(error => {
            console.error('Load error:', error);
            loading.style.display = 'none';
            showAlert('Rasmlarni yuklashda xatolik: ' + error.message, 'error');
        });
}

function displayPhotos(photos) {
    const gallery = document.getElementById('gallery');

    if (!gallery) {
        console.error('Gallery elementi topilmadi');
        return;
    }

    gallery.style.display = 'grid';
    gallery.innerHTML = '';

    photos.forEach(function(photo) {
        const photoCard = createPhotoCard(photo);
        gallery.appendChild(photoCard);
    });
}

function createPhotoCard(photo) {
    const date = new Date(photo.uploaded_at).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';

    const img = document.createElement('img');
    img.src = photo.image_url;
    img.alt = photo.title || 'Rasm';
    img.loading = 'lazy';
    img.onclick = function() {
        openModal(photo.image_url);
    };

    const photoInfo = document.createElement('div');
    photoInfo.className = 'photo-info';

    if (photo.title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'photo-title';
        titleDiv.textContent = photo.title;
        photoInfo.appendChild(titleDiv);
    }

    if (photo.description) {
        const descDiv = document.createElement('div');
        descDiv.className = 'photo-description';
        descDiv.textContent = photo.description;
        photoInfo.appendChild(descDiv);
    }

    const dateDiv = document.createElement('div');
    dateDiv.className = 'photo-date';
    dateDiv.textContent = date;
    photoInfo.appendChild(dateDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'photo-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ O\'chirish';
    deleteBtn.onclick = function() {
        deletePhoto(photo.id);
    };
    actionsDiv.appendChild(deleteBtn);

    photoInfo.appendChild(actionsDiv);
    photoCard.appendChild(img);
    photoCard.appendChild(photoInfo);

    return photoCard;
}

// ==========================================
// DELETE PHOTO
// ==========================================

function deletePhoto(id) {
    if (!confirm('Rostdan ham bu rasmni o\'chirmoqchimisiz?')) {
        return;
    }

    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
        showAlert('CSRF token topilmadi', 'error');
        return;
    }

    fetch(API_URL + id + '/', {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        if (response.ok) {
            showAlert('Rasm o\'chirildi! ✅', 'success');
            loadPhotos();
        } else {
            showAlert('Xatolik yuz berdi!', 'error');
        }
    })
    .catch(error => {
        console.error('Delete error:', error);
        showAlert('Xatolik: ' + error.message, 'error');
    });
}

// ==========================================
// DELETE ALL PHOTOS
// ==========================================

function deleteAllPhotos() {
    const statsText = document.getElementById('statsText');

    if (!statsText) {
        return;
    }

    const match = statsText.textContent && statsText.textContent.match(/\d+/);
    const photoCount = match ? parseInt(match[0]) : 0;

    if (photoCount === 0) {
        showAlert('Galereyada rasm yo\'q!', 'warning');
        return;
    }

    if (!confirm('Barcha ' + photoCount + ' ta rasmni o\'chirmoqchimisiz? Bu amalni bekor qilib bo\'lmaydi!')) {
        return;
    }

    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
        showAlert('CSRF token topilmadi', 'error');
        return;
    }

    fetch(API_URL + 'delete_all/', {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        if (response.ok) {
            showAlert('Barcha rasmlar o\'chirildi! ✅', 'success');
            loadPhotos();
        } else {
            showAlert('Xatolik yuz berdi!', 'error');
        }
    })
    .catch(error => {
        console.error('Delete all error:', error);
        showAlert('Xatolik: ' + error.message, 'error');
    });
}

// ==========================================
// MODAL
// ==========================================

function setupModal() {
    const modal = document.getElementById('modal');

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');

    if (modal && modalImg) {
        modal.classList.add('active');
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function showAlert(message, type) {
    type = type || 'info';
    const emoji = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };

    alert((emoji[type] || '') + ' ' + message);
}

// ==========================================
// INITIALIZE APP
// ==========================================

function initializeApp() {
    loadPhotos();
    setupFileInput();
    setupUploadForm();
    setupModal();
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}