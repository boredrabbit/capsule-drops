const { createCanvas } = require('canvas');
const fs = require('fs');

// Create full resolution canvas (3600x2400 = 12" x 8" at 300 DPI)
const canvas = createCanvas(3600, 2400);
const ctx = canvas.getContext('2d');

// Design specifications matching your mockup
const width = 3600;
const height = 2400;
const baseFontSize = 120;

// Clear canvas (transparent background)
ctx.clearRect(0, 0, width, height);

// Set up text properties
ctx.fillStyle = '#1a1a1a';
ctx.textBaseline = 'middle';

const fontSize = baseFontSize;
const lineHeight = fontSize * 1.65;
const labelWidth = fontSize * 5.8;

let y = fontSize * 1.5;

// Top rule
ctx.strokeStyle = '#1a1a1a';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(width, y);
ctx.stroke();

y += fontSize * 1.8;

// From:
ctx.font = `700 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('From:', 0, y);
ctx.font = `400 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('Elon Musk <', labelWidth, y);

// Redacted email
const redactX = labelWidth + ctx.measureText('Elon Musk <').width;
const redactWidth = fontSize * 7.9;
ctx.fillRect(redactX, y - fontSize * 0.45, redactWidth, fontSize * 0.75);
ctx.fillText('>', redactX + redactWidth + fontSize * 0.15, y);

y += lineHeight;

// Sent:
ctx.font = `700 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('Sent:', 0, y);
ctx.font = `400 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('Sunday, November 25, 2012 12:36 AM', labelWidth, y);

y += lineHeight;

// To:
ctx.font = `700 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('To:', 0, y);
ctx.font = `400 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('Jeffrey Epstein', labelWidth, y);

y += lineHeight;

// Subject:
ctx.font = `700 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('Subject:', 0, y);
ctx.font = `400 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('RE:', labelWidth, y);

y += lineHeight * 2.2;

// Body
ctx.font = `400 ${fontSize}px Calibri, 'Segoe UI', sans-serif`;
ctx.fillText('What day/night will be the wildest party on your island?', 0, y);

// Save the canvas as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('print-design.png', buffer);

console.log('✅ Print-ready design created: print-design.png');
console.log('   Dimensions: 3600 x 2400 pixels (12" x 8" at 300 DPI)');
console.log('   Ready to upload to Gelato!');
