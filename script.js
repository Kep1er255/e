const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;
let currentColor = '#000000';
let currentLineWidth = 2;

// Get the correct canvas position
function getCanvasPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
}

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function endDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentColor;
    ctx.lineCap = 'round';

    const { x, y } = getCanvasPosition(e);

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrawing(touch);
});
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    draw(touch);
});

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

lineWidth.addEventListener('input', (e) => {
    currentLineWidth = e.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'drawing.png';
    link.click();
});
