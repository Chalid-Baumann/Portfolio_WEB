document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.querySelector(".grid-container");
    const canvasContainer = document.getElementById("canvas-container");
    const canvas = document.getElementById("canvas");
    
    // Generate grid dynamically
    function createGrid() {
        gridContainer.innerHTML = "";
        const cols = Math.ceil(canvas.offsetWidth / 20);
        const rows = Math.ceil(canvas.offsetHeight / 20);
        gridContainer.style.width = `${cols * 20}px`;
        gridContainer.style.height = `${rows * 20}px`;
        
        for (let i = 0; i < cols * rows; i++) {
            const square = document.createElement("div");
            square.classList.add("grid-item");
            gridContainer.appendChild(square);
        }
    }
    
    createGrid();
    
    // Update grid when resizing window or zooming
    window.addEventListener("resize", createGrid);

    // Dragging functionality
    let isDragging = false;
    let startX, startY;
    let offsetX = 0, offsetY = 0;
    let scale = 1; // Zoom scale

    // Mouse Events (for desktop)
    canvasContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        canvasContainer.style.cursor = "grabbing";
    });

    canvasContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    });

    canvasContainer.addEventListener("mouseup", () => {
        isDragging = false;
        canvasContainer.style.cursor = "grab";
    });

    // Touch Events (for mobile)
    canvasContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - offsetX;
        startY = e.touches[0].clientY - offsetY;
        canvasContainer.style.cursor = "grabbing";
    });

    canvasContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        offsetX = e.touches[0].clientX - startX;
        offsetY = e.touches[0].clientY - startY;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    });

    canvasContainer.addEventListener("touchend", () => {
        isDragging = false;
        canvasContainer.style.cursor = "grab";
    });

    // Zoom functionality (Mouse wheel)
    canvasContainer.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
            scale = Math.min(scale + zoomFactor, 5); // Enhanced max zoom in
        } else {
            scale = Math.max(scale - zoomFactor, 0.03); // Min zoom out (10px equivalent)
        }
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        createGrid(); // Recreate the grid after zooming
    });

    // Zoom functionality (Pinch to zoom for touch)
    let initialDistance = null;
    canvasContainer.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
            // Calculate pinch distance
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (initialDistance === null) {
                initialDistance = distance;
            } else {
                const zoomFactor = (distance - initialDistance) / 1000;
                scale = Math.max(scale + zoomFactor, 0.03); // Min zoom out (10px equivalent)
                scale = Math.min(scale, 5); // Max zoom in
                canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
                createGrid(); // Recreate the grid after zooming
            }
        }
    });

    canvasContainer.addEventListener("touchend", () => {
        initialDistance = null; // Reset pinch distance when touch ends
    });

    // Function to add images dynamically, grouped by project and placed in a cluster
    function addImagesFromData(imagesData) {
        let currentProjectYPos = 0; // Starting position for the first project
        let currentProjectID = null; // Track the current project ID
        const imageSpacing = 10; // Define a small gap between images

        // To keep track of occupied positions to prevent overlap
        let occupiedPositions = [];

        imagesData.forEach((imageData, index) => {
            // If the project changes, update the Y position and the project ID
            if (imageData.project !== currentProjectID) {
                currentProjectID = imageData.project;
                currentProjectYPos += 600; // Space between projects
            }

            // Create image
            const img = document.createElement("img");
            img.src = imageData.src;
            img.classList.add("image");
            img.style.width = "300px";
            img.style.height = "auto";
            img.style.objectFit = "contain";
            img.style.position = "absolute";
            img.style.background = "none"; // Ensure no black background

            // Try to place image with a small gap but ensure no overlap
            let xPos, yPos;
            let overlap = true;
            const maxAttempts = 100; // Prevent infinite loop

            let attempts = 0;
            while (overlap && attempts < maxAttempts) {
                // Calculate potential position (randomize within a specific range)
                xPos = (index % 5) * 320 + imageSpacing; // Slight random spread horizontally
                yPos = currentProjectYPos + (Math.floor(index / 5) * 320) + imageSpacing; // Slight random vertical spacing

                // Check if this position overlaps with any previously placed image
                overlap = occupiedPositions.some(pos => {
                    return Math.abs(pos.x - xPos) < 300 && Math.abs(pos.y - yPos) < 300; // Image size consideration
                });

                attempts++;
            }

            // Once a non-overlapping position is found, add it to the occupied positions
            occupiedPositions.push({ x: xPos, y: yPos });

            // Apply calculated position to image
            img.style.left = `${xPos}px`;
            img.style.top = `${yPos}px`;

            // Add project ID to the image as a data attribute
            img.setAttribute('data-project-id', currentProjectID);

            // Append the image to the canvas
            canvas.appendChild(img);
        });
    }

    // Example imagesData structure with projects
    const imagesData = [
        { project: 'Project1', src: '/images/Sketches/VD_1_IMG_0593_1.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_IMG_0594_1.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_IMG_0595_1.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_IMG_0590_1.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1 Kopie 5.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1 Kopie 2.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1 Kopie.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1 Kopie 3.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_Ingwershot_P_Zeichenfläche 1 Kopie 4.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_PT_Ingwershot_IMG_0557.jpg' },
        { project: 'Project1', src: '/images/Sketches/VD_1_PT_Ingwershot_IMG_0561.jpg' },
        { project: 'Project2', src: '/images/Sketches/Signaletik_1_IMG_0582_1.jpg' },
        { project: 'Project2', src: '/images/Sketches/Signaletik_1_IMG_0585_1.jpg' },
        { project: 'Project2', src: '/images/Sketches/Signaletik_1_IMG_0586_1.jpg' },
        { project: 'Project2', src: '/images/Sketches/Signaletik_1_IMG_0588_1.jpg' },
        { project: 'Project2', src: '/images/Sketches/Signaletik_1_IMG_0589_1.jpg' },
        //{ project: 'Project3', src: 'https://via.placeholder.com/300' }
    ];

    // Add images to the canvas
    addImagesFromData(imagesData);

    // Function to get images by project ID
    function getImagesByProject(projectId) {
        const images = document.querySelectorAll(`img[data-project-id='${projectId}']`);
        // Do something with the images, e.g., log them
        console.log(images);
    }
});
