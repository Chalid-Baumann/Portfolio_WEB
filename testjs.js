document.addEventListener('DOMContentLoaded', function() {
    const bulletpointIcon = document.querySelector('.bulletpoint-icon');
    const logoContainer = document.getElementById('logo-clickable');
    const letters = document.querySelectorAll('.portfoliotitelone .letter');

    // Index des aktuell sichtbaren Buchstabens
    let currentLetterIndex = 0;

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches; // Oder eine andere Grenze für mobile Geräte
    }

    // **GRID IMPLEMENTATION**
    const secondaryHeader = document.querySelector('.secondary-header');

    // If secondary header exists, proceed to create the grid
    if (secondaryHeader) {
        // Create Grid Container
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid-container');
        secondaryHeader.appendChild(gridContainer);

        // Function to create the grid dynamically
        function createGrid() {
            gridContainer.innerHTML = ''; // Clear existing grid

            console.log('secondary-header dimensions:', secondaryHeader.offsetWidth, secondaryHeader.offsetHeight);

            const cols = Math.ceil(secondaryHeader.offsetWidth / 5); // 5mm per grid item
            const rows = Math.ceil(secondaryHeader.offsetHeight / 5); // 5mm per grid item

            console.log(`Grid Size: ${cols} columns, ${rows} rows`); // Debug grid dimensions

            gridContainer.style.width = `${cols * 5}mm`; // Total width of grid in mm
            gridContainer.style.height = `${rows * 5}mm`; // Total height of grid in mm

            for (let i = 0; i < cols * rows; i++) {
                const square = document.createElement('div');
                square.classList.add('grid-item');
                gridContainer.appendChild(square);
            }

            // Log grid creation
            console.log('Grid created inside secondary-header');
        }

        // Call createGrid initially
        createGrid();

        // Update grid on resize
        window.addEventListener('resize', createGrid);

        // Adjust secondary header for styling and responsiveness
        function adjustSecondaryHeader() {
            // Adjust top position
            secondaryHeader.style.position = 'fixed'; // Make it fixed at the top
            secondaryHeader.style.top = '80px'; // Space from the top of the page
            secondaryHeader.style.width = '100%'; // Ensure it spans the full width
            secondaryHeader.style.backgroundColor = '#FFFFFF'; // Transparent background initially
            secondaryHeader.style.transition = 'background-color 0.3s ease'; // Smooth transition for background change

            // Adjust font size and spacing for smaller screens
            const secondaryHeaderLinks = document.querySelectorAll('.secondary-header ul li a');
            secondaryHeaderLinks.forEach(link => {
                link.style.fontSize = '17px'; // Set font size for smaller screens
            });

            // Update style on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    secondaryHeader.style.backgroundColor = '#FFFFFF'; // Change background on scroll
                } else {
                    secondaryHeader.style.backgroundColor = '#333'; // Reset background color
                }
            });
        }

        // Adjust the secondary header immediately
        adjustSecondaryHeader();

        // Adjust secondary header on resize (for responsive layout)
        window.addEventListener('resize', adjustSecondaryHeader);
    }
    // End of Grid Implementation

    // Bulletpoint Icon Rotation - Klick
    if (bulletpointIcon) {
        bulletpointIcon.addEventListener('click', function() {
            bulletpointIcon.classList.remove('rotate');
            bulletpointIcon.classList.remove('reset-color');
            bulletpointIcon.classList.remove('no-repeat');

            // Trigger Reflow to restart animation
            void bulletpointIcon.offsetWidth;

            bulletpointIcon.classList.add('rotate');

            setTimeout(() => {
                bulletpointIcon.classList.remove('rotate');
                bulletpointIcon.classList.add('reset-color');
                bulletpointIcon.classList.add('no-repeat');
            }, 500); // 500ms = 0.5s for the rotation
        });

        // Hover effect for rotation
        bulletpointIcon.addEventListener('mouseenter', function() {
            if (!bulletpointIcon.classList.contains('rotate')) {
                bulletpointIcon.classList.add('rotate'); // Rotation on hover
            }
        });

        bulletpointIcon.addEventListener('mouseleave', function() {
            bulletpointIcon.classList.remove('rotate'); // Remove rotation on mouse leave
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
        letter.addEventListener('mouseenter', function() {
            if (!isMobile()) { // Only for Desktop
                letter.classList.add('active'); // Activate effect
            }
        });

        letter.addEventListener('mouseleave', function() {
            if (!isMobile()) { // Only for Desktop
                letter.classList.remove('active'); // Reset effect
            }
        });

        // Mobile touch events
        letter.addEventListener('touchstart', function() {
            if (isMobile()) {
                letter.classList.add('active');
            }
        });

        letter.addEventListener('touchend', function() {
            if (isMobile()) {
                letter.classList.remove('active');
            }
        });

        letter.addEventListener('touchcancel', function() {
            if (isMobile()) {
                letter.classList.remove('active');
            }
        });

        // For Drag interactions
        letter.addEventListener('dragstart', function() {
            letter.classList.add('active');
        });

        letter.addEventListener('dragend', function() {
            letter.classList.remove('active');
        });
    });

    // Function to show the next letter
    function showNextLetter() {
        letters[currentLetterIndex].style.display = 'none';

        if (currentLetterIndex < letters.length - 1) {
            currentLetterIndex++;  // Show next letter
        } else {
            currentLetterIndex = 0;  // Go back to the first letter
        }

        letters[currentLetterIndex].style.display = 'inline-block';
    }

    // Initialize letters visibility
    function initializeLetters() {
        letters.forEach((letter, index) => {
            if (index !== 0) {
                letter.style.display = 'none';
            }
        });
    }

    // Event Listener for clicking on letters
    letters.forEach(letter => {
        letter.addEventListener('click', showNextLetter);
    });

    // Initialize letters visibility
    initializeLetters();
});
