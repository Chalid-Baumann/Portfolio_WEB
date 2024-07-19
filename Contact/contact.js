document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

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
});


//Farbänderung Mobile,Hover
if ('ontouchstart' in document.documentElement) {
    // Add event listener for tap on links
    document.addEventListener('touchstart', function (event) {
        // Check if the touched element is a link
        if (event.target.tagName.toLowerCase() === 'a') {
            // Change text color to rgb(255, 28, 65) on tap
            event.target.style.color = 'rgb(255, 28, 65)';
            
            // Optionally, you can revert the color after a delay
            setTimeout(function () {
                event.target.style.color = ''; // Revert to default or specified color
            }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
        }
    });
}