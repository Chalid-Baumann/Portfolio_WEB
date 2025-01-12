document.addEventListener('DOMContentLoaded', function() {
    const bulletpointIcon = document.querySelector('.bulletpoint-icon');
    const logoContainer = document.getElementById('logo-clickable');
    const letters = document.querySelectorAll('.portfoliotitelone .letter');

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches; // Oder eine andere Grenze für mobile Geräte
    }

    // Bulletpoint Icon Rotation
    if (isMobile()) {
        bulletpointIcon.addEventListener('click', function() {
            // Stelle sicher, dass die vorherige Animation entfernt wird
            bulletpointIcon.classList.remove('rotate');
            bulletpointIcon.classList.remove('reset-color');
            bulletpointIcon.classList.remove('no-repeat');

            // Triggern der Reflow, um die Animation neu zu starten
            void bulletpointIcon.offsetWidth; // Triggern des Reflows

            // Starte die Rotation
            bulletpointIcon.classList.add('rotate');

            // Nach der Rotation wird die Farbe zurückgesetzt und das Icon wird gesperrt
            setTimeout(() => {
                bulletpointIcon.classList.remove('rotate');
                bulletpointIcon.classList.add('reset-color');
                bulletpointIcon.classList.add('no-repeat');
            }, 500); // 500ms = 0.5s für die Rotation
        });
    }

    // Logo Wechsel auf Mobile
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // Effekt für Buchstaben bei Hover und Touch/Drag
    letters.forEach(letter => {
        // Für Touch-Interaktionen (Touchstart)
        letter.addEventListener('touchstart', function() {
            letter.classList.add('active');
        });

        // Entfernen der 'active' Klasse beim Beenden des Touchs
        letter.addEventListener('touchend', function() {
            letter.classList.remove('active');
        });

        letter.addEventListener('touchcancel', function() {
            letter.classList.remove('active');
        });

        // Für Drag-Interaktionen
        letter.addEventListener('dragstart', function() {
            letter.classList.add('active');
        });

        letter.addEventListener('dragend', function() {
            letter.classList.remove('active');
        });

        // Sicherstellen, dass die Klasse entfernt wird, wenn der Finger den Bildschirm verlässt (für mobile Geräte)
        letter.addEventListener('touchmove', function() {
            // Optionale Funktion, falls der Benutzer den Finger bewegt, um die Interaktion zu beenden
            letter.classList.remove('active');
        });
    });
});
