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

    // Zoom functionality
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

    // Add images dynamically on double-click
    canvas.addEventListener("dblclick", (e) => {
        const img = document.createElement("img");
        img.src = "https://via.placeholder.com/300"; // Replace with actual image
        img.classList.add("image");
        img.style.width = "300px";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.position = "absolute";
        img.style.background = "none"; // Ensure no black background
        
        const rect = canvas.getBoundingClientRect();
        img.style.left = `${(e.clientX - rect.left) / scale}px`;
        img.style.top = `${(e.clientY - rect.top) / scale}px`;
        
        canvas.appendChild(img);
    });
});
