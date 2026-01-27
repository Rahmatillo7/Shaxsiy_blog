// static/gallery/css/style.css.ts
// CSS-in-TypeScript yoki bu faylni oddiy CSS ga o'zgartiring

export const styles = `
/* ==========================================
   GLOBAL STYLES
   ========================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --dark-color: #1f2937;
    --light-color: #f9fafb;
    --border-radius: 12px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    min-height: 100vh;
    color: var(--dark-color);
}

/* ==========================================
   CONTAINER
   ========================================== */

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ==========================================
   HEADER
   ========================================== */

.header {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px 0;
    box-shadow: var(--box-shadow);
    margin-bottom: 30px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logout-btn {
    background: var(--danger-color);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background: #dc2626;
    transform: translateY(-2px);
}

/* ==========================================
   STATS BAR
   ========================================== */

.stats-bar {
    background: white;
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stats-text {
    font-size: 18px;
    font-weight: 600;
    color: var(--dark-color);
}

.delete-all-btn {
    background: var(--danger-color);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.delete-all-btn:hover {
    background: #dc2626;
    transform: translateY(-2px);
}

/* ==========================================
   UPLOAD SECTION
   ========================================== */

.upload-section {
    background: white;
    padding: 30px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 30px;
}

.upload-section h2 {
    margin-bottom: 20px;
    color: var(--dark-color);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--dark-color);
}

.form-control {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea.form-control {
    resize: vertical;
    min-height: 100px;
}

.file-input-wrapper {
    position: relative;
}

.file-input-label {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.file-input-label:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

input[type="file"] {
    display: none;
}

.selected-file {
    margin-top: 10px;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 6px;
    font-size: 14px;
    display: none;
}

.upload-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.upload-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.upload-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* ==========================================
   GALLERY
   ========================================== */

.gallery-section {
    margin-bottom: 30px;
}

.gallery-section h2 {
    color: white;
    margin-bottom: 20px;
    text-align: center;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.photo-card {
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
}

.photo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.photo-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.3s ease;
}

.photo-card img:hover {
    opacity: 0.9;
}

.photo-info {
    padding: 15px;
}

.photo-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--dark-color);
    margin-bottom: 8px;
}

.photo-description {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 10px;
    line-height: 1.5;
}

.photo-date {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 12px;
}

.photo-actions {
    display: flex;
    gap: 10px;
}

.delete-btn {
    flex: 1;
    padding: 8px 16px;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.delete-btn:hover {
    background: #dc2626;
}

/* ==========================================
   LOADING & EMPTY STATE
   ========================================== */

.loading {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f4f6;
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-text {
    font-size: 16px;
    color: #6b7280;
}

.empty-state {
    text-align: center;
    padding: 80px 20px;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.empty-icon {
    font-size: 80px;
    margin-bottom: 20px;
}

.empty-state h3 {
    font-size: 24px;
    color: var(--dark-color);
    margin-bottom: 10px;
}

.empty-state p {
    font-size: 16px;
    color: #6b7280;
}

/* ==========================================
   MODAL
   ========================================== */

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.modal-img {
    width: 100%;
    height: auto;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
}

.modal-close {
    position: absolute;
    top: -40px;
    right: 0;
    font-size: 36px;
    color: white;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    line-height: 1;
    transition: all 0.3s ease;
}

.modal-close:hover {
    color: var(--danger-color);
    transform: scale(1.2);
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        gap: 15px;
    }

    .stats-bar {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
    }

    .photo-card img {
        height: 200px;
    }

    .upload-section {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 10px;
    }

    .gallery {
        grid-template-columns: 1fr;
    }

    .logo {
        font-size: 20px;
    }

    .upload-section h2,
    .gallery-section h2 {
        font-size: 20px;
    }
}
`;

// Agar siz CSS faylini alohida ishlatmoqchi bo'lsangiz,
// bu faylni style.css deb nomlang va .ts o'rniga .css qo'ying