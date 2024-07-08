function openProject(url) {
    window.location.href = url;
}


/*Hier ist der JavaScript-Code, um das gerade Ausrichten der Bilder beim Klicken und Draggen zu ermöglichen:*/
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isDragging = false;

    galleryItems.forEach(item => {
        item.addEventListener('mousedown', () => {
            isDragging = false;
        });

        item.addEventListener('mousemove', () => {
            isDragging = true;
        });

        item.addEventListener('mouseup', () => {
            if (isDragging) return;
            item.style.transform = 'rotate3d(1, 1, 0, 0deg)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'rotate3d(1, 1, 0, 45deg)';
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('dragstart', (event) => {
            event.preventDefault();
            item.style.transform = 'rotate3d(1, 1, 0, 0deg)';
        });
    });
});