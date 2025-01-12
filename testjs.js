document.addEventListener('DOMContentLoaded', function() {
    const bulletpointIcon = document.querySelector('.bulletpoint-icon');
    const logoContainer = document.getElementById('logo-clickable');
    const letters = document.querySelectorAll('.portfoliotitelone .letter');

    // Index des aktuell sichtbaren Buchstabens
    let currentLetterIndex = 0;

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches; // Oder eine andere Grenze für mobile Geräte
    }

    // Bulletpoint Icon Rotation - Klick
    if (bulletpointIcon) {
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

        // Für Hover-Effekte (rotation sollte hier nur auf hover erfolgen)
        bulletpointIcon.addEventListener('mouseenter', function() {
            if (!bulletpointIcon.classList.contains('rotate')) {
                bulletpointIcon.classList.add('rotate'); // Rotation bei Hover
            }
        });

        bulletpointIcon.addEventListener('mouseleave', function() {
            bulletpointIcon.classList.remove('rotate'); // Entferne Rotation bei Verlassen
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

    // Funktion, um den nächsten Buchstaben anzuzeigen
    function showNextLetter() {
        // Verstecke den aktuellen Buchstaben
        letters[currentLetterIndex].style.display = 'none';

        // Wenn der letzte Buchstabe erreicht ist, beginne wieder bei 0
        if (currentLetterIndex < letters.length - 1) {
            currentLetterIndex++;  // Nächsten Buchstaben anzeigen
        } else {
            currentLetterIndex = 0;  // Zurück zum ersten Buchstaben (P)
        }

        // Zeige den nächsten Buchstaben
        letters[currentLetterIndex].style.display = 'inline-block';
    }

    // Setze die Sichtbarkeit der Buchstaben auf den ersten Buchstaben
    function initializeLetters() {
        letters.forEach((letter, index) => {
            // Alle Buchstaben verstecken, bis auf den ersten
            if (index !== 0) {
                letter.style.display = 'none';
            }
        });
    }

    // Event Listener für den Klick auf einen Buchstaben
    letters.forEach(letter => {
        letter.addEventListener('click', showNextLetter);
    });

    // Initialisiere die Sichtbarkeit der Buchstaben
    initializeLetters();
});
