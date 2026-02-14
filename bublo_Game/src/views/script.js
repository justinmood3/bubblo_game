const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Bubble class
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50; // start below the screen
        this.radius = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`; // light blue bubble
        ctx.fill();
    }

    update() {
        this.y -= this.speed; // move up
        if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// Create bubbles
const bubblesArray = [];
for (let i = 0; i < 50; i++) {
    bubblesArray.push(new Bubble());
}

// Animate bubbles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubblesArray.forEach(bubble => bubble.update());
    requestAnimationFrame(animate);
}

animate();

// Make canvas responsive
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
