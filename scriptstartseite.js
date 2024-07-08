function openProject(url) {
    window.location.href = url;
}

// JavaScript-Code für das Draggen und Klicken auf die Galerie-Items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isDragging = false;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    galleryItems.forEach(item => {
        if (!isMobile) {
            // Nur für Desktop: Hover-Effekte
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate3d(1, 1, 0, 0deg)';
                item.style.zIndex = '1030'; // Setzt den z-index höher beim Hover
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)';
                    item.style.zIndex = '1'; // Setzt den z-index zurück
                }
            });
        } else {
            // Nur für Mobile: Tap und Drag-Effekte
            item.addEventListener('mousedown', () => {
                isDragging = false;
            });

            item.addEventListener('mousemove', () => {
                isDragging = true;
            });

            item.addEventListener('mouseup', () => {
                if (isDragging) return;
                item.style.transform = 'scale(1.1) rotate3d(1, 1, 0, 0deg)';
                item.classList.add('active');
            });

            item.addEventListener('dragstart', (event) => {
                event.preventDefault();
                item.style.transform = 'scale(1.1) rotate3d(1, 1, 0, 0deg)';
                item.classList.add('active');
            });

            item.addEventListener('click', () => {
                galleryItems.forEach(g => g.classList.remove('active'));
                item.classList.add('active');
                item.style.transform = 'scale(1.1) rotate3d(1, 1, 0, 0deg)';
            });
        }
    });
});
