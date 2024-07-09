document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isDragging = false;

    // Ermitteln, ob der Benutzer auf einem mobilen Gerät ist
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    galleryItems.forEach(item => {
        if (!isMobile) {
            // Nur für Desktop: Hover-Effekte
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate3d(1, 1, 0, 0deg)'; // Vergrößert das Item beim Hover
                item.style.zIndex = '1030'; // Setzt den z-index höher beim Hover
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Setzt die ursprüngliche Transformation zurück
                    item.style.zIndex = '1'; // Setzt den z-index auf Standard zurück
                }
            });

            item.addEventListener('click', () => {
                galleryItems.forEach(i => i.classList.remove('active')); // Entfernt `active` von allen Items
                item.classList.add('active'); // Fügt `active` zum geklickten Item hinzu

                // Öffne die neue HTML-Seite, wenn der Text „01 GIG Powerdrinks and Softdrinks“ geklickt wird
                const link = item.getAttribute('data-link');
                if (link) {
                    window.location.href = link; // Leitet auf die angegebene HTML-Seite weiter
                }
            });
        } else {
            // Nur für mobile Geräte: Touch-Events
            item.addEventListener('touchstart', () => {
                item.style.transform = 'scale(1.05) rotate3d(1, 1, 0, 0deg)'; // Vergrößert das Item beim Tippen
                item.style.zIndex = '1030'; // Setzt den z-index höher beim Tippen
            });

            item.addEventListener('touchend', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'scale(0.95) rotate3d(1, 1, 0, 45deg)'; // Setzt die ursprüngliche Transformation zurück
                    item.style.zIndex = '1'; // Setzt den z-index auf Standard zurück
                }
            });

            item.addEventListener('click', () => {
                galleryItems.forEach(i => i.classList.remove('active')); // Entfernt `active` von allen Items
                item.classList.add('active'); // Fügt `active` zum geklickten Item hinzu

                // Öffne die neue HTML-Seite, wenn der Text „01 GIG Powerdrinks and Softdrinks“ geklickt wird
                const link = item.getAttribute('data-link');
                if (link) {
                    window.location.href = link; // Leitet auf die angegebene HTML-Seite weiter
                }
            });
        }
    });

    // Erlaubt das Scrollen durch Ziehen auf der Galerie (nur für Desktop)
    if (!isMobile) {
        const galleryContainer = document.querySelector('.gallery-container');
        let startX, scrollLeft;

        galleryContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - galleryContainer.offsetLeft;
            scrollLeft = galleryContainer.scrollLeft;
        });

        galleryContainer.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        galleryContainer.addEventListener('mouseup', () => {
            isDragging = false;
        });

        galleryContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - galleryContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            galleryContainer.scrollLeft = scrollLeft - walk;
        });
    }
});
