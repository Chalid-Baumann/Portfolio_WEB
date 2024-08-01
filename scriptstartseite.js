document.addEventListener('DOMContentLoaded', () => {
    const bLogo = document.getElementById('b-logo');
    const logoContainer = document.getElementById('animated-logo');
    const bulletpointIcons = document.querySelectorAll('.bulletpoint-icon');
    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    // Funktion zum Zentrieren des Logos im Container
    function centerLogo() {
        if (!logoContainer || !bLogo) return;

        const containerWidth = logoContainer.clientWidth;
        const containerHeight = logoContainer.clientHeight;
        const logoWidth = bLogo.offsetWidth;
        const logoHeight = bLogo.offsetHeight;

        bLogo.style.position = 'absolute';
        bLogo.style.left = `${(containerWidth - logoWidth) / 2}px`;
        bLogo.style.top = `${(containerHeight - logoHeight) / 2}px`;
    }

    centerLogo();
    window.addEventListener('resize', centerLogo);

    // Funktion zur Größenänderung des Logos basierend auf der Position im Viewport
    function adjustLogoSize(x, y) {
        if (!isDragging) return; // Größe nur beim Verschieben anpassen

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Berechnung der Skalierung basierend auf der Position im Viewport
        const scaleX = x / viewportWidth;
        const scaleY = y / viewportHeight;

        // Skalierungsfaktoren berechnen
        const scaleFactorX = 0.5 + (scaleX * 1.0); // 50% bis 150% Skalierung
        const scaleFactorY = 0.5 + (scaleY * 1.0); // 50% bis 150% Skalierung

        // Die kleinere Skalierung von beiden Achsen verwenden
        const scaleFactor = Math.max(0.5, Math.min(1.5, Math.min(scaleFactorX, scaleFactorY)));

        bLogo.style.transform = `scale(${scaleFactor})`;
    }

    // Funktion zur Anpassung der Konturbreite
    function adjustStrokeWidth(mouseX, mouseY) {
        const rect = bLogo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxStrokeWidth = 10;
        const minStrokeWidth = 1;
        const newStrokeWidth = Math.max(minStrokeWidth, Math.min(maxStrokeWidth, distance / 50));
        bLogo.style.strokeWidth = `${newStrokeWidth}px`;
    }

    // Funktion zur Aktualisierung des Schattens
    function updateShadow(mouseX, mouseY) {
        if (!isDragging) {
            const rect = bLogo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxShadowSize = 50;
            const newShadowSize = Math.min(maxShadowSize, distance / 50);
            bLogo.style.filter = `drop-shadow(0 0 ${newShadowSize}px rgba(0, 0, 255, 1))`;
        }
    }

    // Funktion zur Generierung einer zufälligen Farbe
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Funktion zur Änderung der Stroke-Farbe
    function changeStrokeColor() {
        bLogo.style.stroke = getRandomColor();
    }

    // Funktion zum Starten des Ziehens
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
        const rect = bLogo.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        bLogo.style.cursor = 'grabbing';
    }

    // Funktion zum Bewegen des Logos
    function handleMouseMove(e) {
        if (isDragging) {
            const containerRect = logoContainer.getBoundingClientRect();
            let x = e.pageX - offsetX;
            let y = e.pageY - offsetY;

            // Verhindern, dass das Logo den Container verlässt
            const logoWidth = bLogo.offsetWidth;
            const logoHeight = bLogo.offsetHeight;
            x = Math.max(0, Math.min(containerRect.width - logoWidth, x));
            y = Math.max(0, Math.min(containerRect.height - logoHeight, y));

            bLogo.style.left = `${x}px`;
            bLogo.style.top = `${y}px`;

            adjustLogoSize(e.pageX, e.pageY); // Größe basierend auf Position im Viewport anpassen
        } else {
            updateShadow(e.clientX, e.clientY); // Schatten nur wenn nicht verschoben
        }
    }

    // Funktion zum Beenden des Ziehens
    function handleMouseUp() {
        isDragging = false;
        bLogo.style.cursor = 'pointer';
    }

    // Funktion beim Verlassen des Containers
    function handleMouseOut() {
        if (isDragging) handleMouseUp();
    }

    // Funktion zur Bearbeitung von Touch-Events
    function handleTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            isDragging = true;
            startX = touch.pageX;
            startY = touch.pageY;
            const rect = bLogo.getBoundingClientRect();
            offsetX = startX - rect.left;
            offsetY = startY - rect.top;
            bLogo.style.cursor = 'grabbing';
        }
    }

    function handleTouchMove(e) {
        if (isDragging && e.touches.length === 1) {
            const touch = e.touches[0];
            const containerRect = logoContainer.getBoundingClientRect();
            let x = touch.pageX - offsetX;
            let y = touch.pageY - offsetY;

            // Verhindern, dass das Logo den Container verlässt
            const logoWidth = bLogo.offsetWidth;
            const logoHeight = bLogo.offsetHeight;
            x = Math.max(0, Math.min(containerRect.width - logoWidth, x));
            y = Math.max(0, Math.min(containerRect.height - logoHeight, y));

            bLogo.style.left = `${x}px`;
            bLogo.style.top = `${y}px`;

            adjustLogoSize(touch.pageX, touch.pageY); // Größe basierend auf Position im Viewport anpassen

            // Verhindern, dass beim Verschieben gescrollt wird
            e.preventDefault();
        } else if (e.touches.length === 1) {
            const touch = e.touches[0];
            updateShadow(touch.clientX, touch.clientY);
        }
    }

    function handleTouchEnd() {
        isDragging = false;
        bLogo.style.cursor = 'pointer';
    }

    bLogo.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseOut);

    bLogo.addEventListener('touchstart', handleTouchStart);
    bLogo.addEventListener('touchmove', handleTouchMove);
    bLogo.addEventListener('touchend', handleTouchEnd);

    // Event-Listener für Klicks und Taps, um die Stroke-Farbe zu ändern
    bLogo.addEventListener('click', changeStrokeColor);
    bLogo.addEventListener('touchend', changeStrokeColor);

    bulletpointIcons.forEach(icon => {
        let isAnimating = false;

        icon.addEventListener('mouseover', () => {
            if (!isAnimating) {
                icon.classList.add('hover-rotate');
            }
        });

        icon.addEventListener('mouseout', () => {
            if (!isAnimating) {
                icon.classList.remove('hover-rotate');
            }
        });

        icon.addEventListener('click', () => {
            if (!isAnimating) {
                isAnimating = true;
                icon.classList.add('rotate');
                icon.addEventListener('animationend', () => {
                    icon.classList.remove('rotate');
                    isAnimating = false;
                });
            }
        });
    });
});
