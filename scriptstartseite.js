function openProject(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isDragging = false;

    // Ermitteln, ob der Benutzer auf einem mobilen Gerät ist
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    galleryItems.forEach(item => {
        if (!isMobile) {
            // Nur für Desktop: Hover-Effekte
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate3d(1, 1, 0, 0deg)'; // Vergrößert und richtet das Item beim Hover aus
                item.style.zIndex = '1030'; // Setzt den z-index höher beim Hover
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Verkleinert und dreht das Item zurück
                    item.style.zIndex = '1'; // Setzt den z-index zurück
                }
            });
        } else {
            // Nur für Mobile: Tap und Drag-Effekte
            item.addEventListener('touchstart', () => {
                isDragging = false;
            });

            item.addEventListener('touchmove', () => {
                isDragging = true;
            });

            item.addEventListener('touchend', () => {
                if (isDragging) return;
                item.classList.toggle('active');
                item.style.transform = item.classList.contains('active')
                    ? 'scale(1.1) rotate3d(1, 1, 0, 0deg)' // Vergrößert und richtet das Item beim Aktivieren aus
                    : 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Verkleinert und dreht das Item zurück
                item.style.zIndex = item.classList.contains('active') ? '1020' : '1'; // Setzt den z-index basierend auf der Aktivierung
            });

            item.addEventListener('dragstart', (event) => {
                event.preventDefault(); // Verhindert das Standard-Drag-Verhalten
                item.style.transform = 'scale(1.1) rotate3d(1, 1, 0, 0deg)'; // Vergrößert und richtet das Item beim Draggen aus
                item.classList.add('active');
                item.style.zIndex = '1020'; // Setzt den z-index für das aktive Item
            });

            item.addEventListener('click', () => {
                galleryItems.forEach(g => {
                    g.classList.remove('active');
                    g.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Verkleinert und dreht alle Items zurück
                    g.style.zIndex = '1'; // Setzt den z-index zurück
                });
                item.classList.add('active');
                item.style.transform = 'scale(1.1) rotate3d(1, 1, 0, 0deg)'; // Vergrößert und richtet das Item beim Klicken aus
                item.style.zIndex = '1020'; // Setzt den z-index für das aktive Item
            });
        }
    });

    // Bei Desktop Geräten: Setze die 'active' Klasse zurück, wenn auf den Container geklickt wird
    if (!isMobile) {
        document.querySelector('#gallery').addEventListener('click', (event) => {
            if (!event.target.classList.contains('gallery-item')) {
                galleryItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Verkleinert und dreht alle Items zurück
                    item.style.zIndex = '1'; // Setzt den z-index zurück
                });
            }
        });
    }
});
