document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageElement = document.getElementById('chalid-image');
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
    const scrollTopButton = document.getElementById('scrollTop');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Farbänderung Mobile, Hover
    if ('ontouchstart' in document.documentElement) {
        document.addEventListener('touchstart', function (event) {
            if (event.target.tagName.toLowerCase() === 'a') {
                event.target.style.color = 'rgb(255, 28, 65)';
                setTimeout(() => {
                    event.target.style.color = '';
                }, 1000); // Adjust delay as needed
            }
        });
    }

    // Mousemove-Event-Listener für Desktops
    document.addEventListener('mousemove', function (e) {
        if (!imageElement) return; // Überprüfen, ob das Bild-Element vorhanden ist

        const rect = imageElement.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        const width = rect.width;
        const height = rect.height;
        
        if (x < width / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidLeft.png';
        } else if (x > 2 * width / 3) {
            imageElement.src = '/images/ChalidBaumann/Chalidright.png';
        } else if (y < height / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidUp.png';
        } else if (y > 2 * height / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidDown.png';
        } else {
            imageElement.src = '/images/ChalidBaumann/ChalidStraight.png';
        }
    });

    // Touchmove-Event-Listener für Mobile
    document.addEventListener('touchmove', function (e) {
        if (!imageElement) return; // Überprüfen, ob das Bild-Element vorhanden ist

        // Verarbeiten Sie das erste Touch-Event
        const touch = e.touches[0];
        const rect = imageElement.getBoundingClientRect();
        const x = touch.clientX - rect.left; 
        const y = touch.clientY - rect.top; 
        const width = rect.width;
        const height = rect.height;

        if (x < width / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidLeft.png';
        } else if (x > 2 * width / 3) {
            imageElement.src = '/images/ChalidBaumann/Chalidright.png';
        } else if (y < height / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidUp.png';
        } else if (y > 2 * height / 3) {
            imageElement.src = '/images/ChalidBaumann/ChalidDown.png';
        } else {
            imageElement.src = '/images/ChalidBaumann/ChalidStraight.png';
        }
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
        icon.addEventListener('mouseover', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(360deg)'; // Desktop Hover-Effekt
            }
        });

        icon.addEventListener('mouseout', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(0deg)'; // Zurücksetzen der Rotation
            }
        });

        icon.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Verhindert die Standardaktion des Touchs
            resetIcons(); // Alle Icons zurücksetzen
            icon.classList.add('active');
            icon.style.transition = 'transform 1s'; // Übergang hinzufügen
            icon.style.transform = 'rotate(360deg)'; // Mobile Touch-Effekt

            // Nach der Animation zurücksetzen
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
                icon.classList.remove('active'); // Entfernen der Aktiv-Klasse
            }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
        });

        icon.addEventListener('click', () => {
            if (!icon.classList.contains('active')) { // Verhindert Rotation, wenn schon aktiv
                resetIcons(); // Alle Icons zurücksetzen
                icon.classList.add('active');
                icon.style.transition = 'transform 1s'; // Übergang hinzufügen
                icon.style.transform = 'rotate(360deg)'; // Klick-Effekt

                // Nach der Animation zurücksetzen
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)'; // Nach dem Klick zurücksetzen
                    icon.classList.remove('active'); // Entfernen der Aktiv-Klasse
                }, 1000); // Verzögerung um sicherzustellen, dass die Rotation abgeschlossen ist
            }
        });
    });
});
