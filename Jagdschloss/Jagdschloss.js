document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const icons = document.querySelectorAll('.bulletpoint-icon');

    // Funktion zum Anordnen der Galerie
    const arrangeGallery = () => {
        let lastItemWasVertical = false;

        galleryItems.forEach((item, index) => {
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
    document.getElementById('scrollTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hilfsfunktion zum Zurücksetzen aller Icons
    const resetIcons = () => {
        icons.forEach(icon => {
            icon.classList.remove('active');
            icon.style.transform = 'rotate(0deg)';
        });
    };

    // Rotieren des Icons beim Hover und Touch
    icons.forEach(icon => {
        // Desktop Hover-Effekt
        icon.addEventListener('mouseover', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(360deg)'; // Rotation
            }
        });

        icon.addEventListener('mouseout', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(0deg)'; // Zurücksetzen der Rotation
            }
        });

        // Mobile Touch-Effekt
        icon.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Verhindert die Standardaktion des Touchs
            resetIcons(); // Alle Icons zurücksetzen
            icon.classList.add('active');
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(360deg)'; // Rotation

            // Nach der Animation zurücksetzen
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
                icon.classList.remove('active'); // Entfernen der Aktiv-Klasse
            }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
        });

        // Klick-Effekt für Desktops
        icon.addEventListener('click', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                resetIcons(); // Alle Icons zurücksetzen
                icon.classList.add('active');
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(360deg)'; // Rotation

                // Nach der Animation zurücksetzen
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
                    icon.classList.remove('active'); // Entfernen der Aktiv-Klasse
                }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
            }
        });
    });

    // Farbänderung Mobile, Hover
    if ('ontouchstart' in document.documentElement) {
        document.addEventListener('touchstart', function (event) {
            if (event.target.tagName.toLowerCase() === 'a') {
                event.target.style.color = 'rgb(255, 28, 65)';
                setTimeout(() => {
                    event.target.style.color = '';
                }, 1000); // Verzögerung zum Zurücksetzen der Farbe
            }
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
