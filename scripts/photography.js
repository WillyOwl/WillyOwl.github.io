document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a photography page
    if (!document.querySelector('.photography-section')) return;

    const gallery = document.querySelector('.photo-gallery');
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDescription');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxLocation = document.getElementById('lightboxLocation');
    let currentPhotoIndex = 0;
    let visiblePhotos = [];

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter photos
            const category = button.dataset.category;
            photoItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update visible photos array for lightbox navigation
            updateVisiblePhotos();
        });
    });

    // Update array of currently visible photos
    function updateVisiblePhotos() {
        visiblePhotos = Array.from(photoItems).filter(
            item => item.style.display !== 'none'
        );
    }

    // Initialize visible photos
    updateVisiblePhotos();

    // Lightbox functionality
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentPhotoIndex = visiblePhotos.indexOf(item);
            updateLightbox(item);
            lightbox.classList.add('active');
        });
    });

    function updateLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        const date = item.querySelector('.date');
        const location = item.querySelector('.location');

        lightboxImg.src = img.src;
        lightboxTitle.textContent = title.textContent;
        lightboxDesc.textContent = desc.textContent;
        lightboxDate.textContent = date.textContent;
        lightboxLocation.textContent = location.textContent;
    }

    // Close lightbox
    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });

    // Lightbox navigation
    document.querySelector('.lightbox-nav.prev').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
        updateLightbox(visiblePhotos[currentPhotoIndex]);
    });

    document.querySelector('.lightbox-nav.next').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % visiblePhotos.length;
        updateLightbox(visiblePhotos[currentPhotoIndex]);
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            currentPhotoIndex = (currentPhotoIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
            updateLightbox(visiblePhotos[currentPhotoIndex]);
        } else if (e.key === 'ArrowRight') {
            currentPhotoIndex = (currentPhotoIndex + 1) % visiblePhotos.length;
            updateLightbox(visiblePhotos[currentPhotoIndex]);
        }
    });
}); 