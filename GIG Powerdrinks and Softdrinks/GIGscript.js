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
            icon.style.transform = 'rotate(0deg)';
            icon.style.transition = 'none'; // Übergang vorübergehend entfernen
        });
    };

    // Rotieren des Icons beim Hover und Touch
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            resetIcons(); // Alle Icons zurücksetzen
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(360deg)'; // Desktop Hover-Effekt
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(0deg)'; // Zurücksetzen der Rotation
        });

        icon.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Verhindert die Standardaktion des Touchs
            resetIcons(); // Alle Icons zurücksetzen
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(360deg)'; // Mobile Touch-Effekt

            // Nach der Animation zurücksetzen
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
            }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
        });

        icon.addEventListener('click', () => {
            resetIcons(); // Alle Icons zurücksetzen
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(360deg)'; // Klick-Effekt

            // Nach der Animation zurücksetzen
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
            }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
        });
    });
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
