document.addEventListener('DOMContentLoaded', () => {
    const bLogo = document.getElementById('b-logo');
    const bulletpointIcons = document.querySelectorAll('.bulletpoint-icon');
    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    function centerLogo() {
        const logoContainer = document.getElementById('animated-logo');
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

    function adjustStrokeWidth(mouseX, mouseY) {
        const rect = bLogo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxStrokeWidth = 1;
        const minStrokeWidth = 1;
        const newStrokeWidth = Math.max(minStrokeWidth, Math.min(maxStrokeWidth, distance / 50));
        bLogo.style.strokeWidth = `${newStrokeWidth}px`;
    }

    function updateShadow(mouseX, mouseY) {
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

    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
        const rect = bLogo.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        bLogo.style.cursor = 'grabbing';
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const x = e.pageX - offsetX;
            const y = e.pageY - offsetY;
            bLogo.style.left = `${x}px`;
            bLogo.style.top = `${y}px`;
        } else {
            adjustStrokeWidth(e.clientX, e.clientY);
            updateShadow(e.clientX, e.clientY);
        }
    }

    function handleMouseUp() {
        isDragging = false;
        bLogo.style.cursor = 'pointer';
    }

    function handleMouseOut() {
        if (isDragging) handleMouseUp();
    }

    bLogo.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseOut);

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
            const x = touch.pageX - offsetX;
            const y = touch.pageY - offsetY;
            bLogo.style.left = `${x}px`;
            bLogo.style.top = `${y}px`;
        } else if (e.touches.length === 1) {
            const touch = e.touches[0];
            adjustStrokeWidth(touch.clientX, touch.clientY);
            updateShadow(touch.clientX, touch.clientY);
        }
    }

    function handleTouchEnd() {
        isDragging = false;
        bLogo.style.cursor = 'pointer';
    }

    bLogo.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

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
