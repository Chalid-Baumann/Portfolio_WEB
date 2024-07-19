document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageElement = document.getElementById('chalid-image');

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
            imageElement.src = '/images/Chalid_Baumann_1.png';
        } else if (x > 2 * width / 3) {
            imageElement.src = '/images/Chalid_Baumann_3.png';
        } else if (y < height / 3) {
            imageElement.src = '/images/Chalid_Baumann_2.png';
        } else if (y > 2 * height / 3) {
            imageElement.src = '/images/Chalid_Baumann_4.png';
        } else {
            imageElement.src = '/images/Chalid_Baumann_5.png';
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
            imageElement.src = '/images/Chalid_Baumann_1.png';
        } else if (x > 2 * width / 3) {
            imageElement.src = '/images/Chalid_Baumann_3.png';
        } else if (y < height / 3) {
            imageElement.src = '/images/Chalid_Baumann_2.png';
        } else if (y > 2 * height / 3) {
            imageElement.src = '/images/Chalid_Baumann_4.png';
        } else {
            imageElement.src = '/images/Chalid_Baumann_5.png';
        }
    });
});
