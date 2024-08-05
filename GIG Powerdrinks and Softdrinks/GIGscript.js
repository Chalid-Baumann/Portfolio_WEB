document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const icons = document.querySelectorAll('.bulletpoint-icon');
    const bulletpointIcon = document.querySelector('.bulletpoint-icon');
    const logoContainer = document.getElementById('logo-clickable');

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches; // Oder eine andere Grenze für mobile Geräte
    }

    // Funktion zum Anordnen der Galerie
    const arrangeGallery = () => {
        let lastItemWasVertical = false;

        galleryItems.forEach((item) => {
            const aspectRatio = item.getAttribute('data-aspect-ratio');

            // Entfernen von vorherigen Klassen
            item.classList.remove('large', 'medium', 'small');
            
            // Layout-Logik
            if (aspectRatio === 'vertical') {
                item.classList.add('large');
                lastItemWasVertical = true;
            } else if (aspectRatio === 'horizontal' && lastItemWasVertical) {
                item.classList.add('medium');
                lastItemWasVertical = false;
            } else if (aspectRatio === 'horizontal' && !lastItemWasVertical) {
                item.classList.add('small');
                lastItemWasVertical = false;
            } else if (aspectRatio === 'square') {
                item.classList.add('small');
            }
        });
    };

    arrangeGallery();
    window.addEventListener('resize', arrangeGallery);

    // Scroll-zu-Top-Funktionalität hinzufügen
    const scrollTopButton = document.getElementById('scrollTop');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Entfernen der Hover-, Touch- und Click-Ereignisse für die Icons
    icons.forEach(icon => {
        icon.style.animation = 'continuousRotate 10s linear infinite';
    });

    // Bulletpoint Icon Rotation für mobile Geräte
    if (bulletpointIcon && isMobile()) {
        bulletpointIcon.addEventListener('click', function() {
            // Stelle sicher, dass die vorherige Animation entfernt wird
            bulletpointIcon.classList.remove('rotate', 'reset-color', 'no-repeat');

            // Triggern der Reflow, um die Animation neu zu starten
            void bulletpointIcon.offsetWidth; // Triggern des Reflows

            // Starte die Rotation
            bulletpointIcon.classList.add('rotate');

            // Nach der Rotation wird die Farbe zurückgesetzt und das Icon wird gesperrt
            setTimeout(() => {
                bulletpointIcon.classList.remove('rotate');
                bulletpointIcon.classList.add('reset-color', 'no-repeat');
            }, 500); // 500ms = 0.5s für die Rotation
        });
    }

    // Logo Wechsel auf Mobile
    if (logoContainer && isMobile()) {
        logoContainer.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Fancybox Initialisierung
$(document).ready(function() {
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        loop: false,
        protect: true
    });
});
