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
        // Effekt bei Hover für Desktop
        letter.addEventListener('mouseenter', function() {
            if (!isMobile()) { // Nur für Desktop
                letter.classList.add('active'); // Effekt aktivieren
            }
        });

        letter.addEventListener('mouseleave', function() {
            if (!isMobile()) { // Nur für Desktop
                letter.classList.remove('active'); // Effekt zurücksetzen
            }
        });

        // Effekt bei Touchstart für Mobile
        letter.addEventListener('touchstart', function() {
            if (isMobile()) { // Nur für Mobile
                letter.classList.add('active'); // Effekt aktivieren
            }
        });

        // Effekt bei Touchend für Mobile
        letter.addEventListener('touchend', function() {
            if (isMobile()) { // Nur für Mobile
                letter.classList.remove('active'); // Effekt zurücksetzen
            }
        });

        // Wenn der Benutzer die Berührung unterbricht (z.B. beim Verlassen des Elements)
        letter.addEventListener('touchcancel', function() {
            if (isMobile()) { // Nur für Mobile
                letter.classList.remove('active'); // Effekt zurücksetzen
            }
        });

        // Für Drag-Interaktionen
        letter.addEventListener('dragstart', function() {
            letter.classList.add('active'); // Effekt aktivieren
        });

        letter.addEventListener('dragend', function() {
            letter.classList.remove('active'); // Effekt zurücksetzen
        });
    });
});
