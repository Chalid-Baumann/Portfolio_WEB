let logoImg;
let logos = [];
let dragging = false;
let offsetX, offsetY;

function preload() {
    // Versuche, das Logo-Bild zu laden
    logoImg = loadImage('/B.svg'), 
        () => console.log('Bild erfolgreich geladen'), 
        () => console.error('Fehler beim Laden des Bildes');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop(); // Keine Schleifen, wir zeichnen nur, wenn es nötig ist
    background(255); // Hintergrundfarbe setzen
    if (logoImg) {
        console.log('Logo-Bild ist vorhanden.');
    } else {
        console.error('Kein Logo-Bild gefunden.');
    }
}

function draw() {
    background(255);

    // Zeichne alle Logos
    for (let i = 0; i < logos.length; i++) {
        image(logos[i].img, logos[i].x, logos[i].y);
    }
}

function mousePressed() {
    // Überprüfe, ob der Klick innerhalb eines Logos ist
    for (let i = 0; i < logos.length; i++) {
        let logo = logos[i];
        if (mouseX > logo.x && mouseX < logo.x + logo.img.width &&
            mouseY > logo.y && mouseY < logo.y + logo.img.height) {
            dragging = true;
            offsetX = mouseX - logo.x;
            offsetY = mouseY - logo.y;
            logo.dragging = true;
            break;
        }
    }
}

function mouseDragged() {
    if (dragging) {
        for (let i = 0; i < logos.length; i++) {
            let logo = logos[i];
            if (logo.dragging) {
                logo.x = mouseX - offsetX;
                logo.y = mouseY - offsetY;
                redraw(); // Aktualisiere das Canvas
                break;
            }
        }
    }
}

function mouseReleased() {
    dragging = false;
    for (let i = 0; i < logos.length; i++) {
        logos[i].dragging = false;
    }
}

function keyPressed() {
    if (key === 'c') { // Taste 'c' zum Hinzufügen eines neuen Logos
        logos.push({ img: logoImg, x: mouseX, y: mouseY, dragging: false });
        redraw(); // Aktualisiere das Canvas
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
