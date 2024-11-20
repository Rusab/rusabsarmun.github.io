class Particle {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.size = Math.random() * 3 + 1.5; // Increased size range
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(30, 144, 255, 0.8)'; // Slightly more opaque
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;

        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;

                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }
    }
}

class PlexusAnimation {
    constructor() {
        this.canvas = document.getElementById('plexus');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 100
        };

        this.resizeCanvas();
        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        const numberOfParticles = Math.min(100, (this.canvas.width * this.canvas.height) / 20000);
        this.particles = [];

        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(x, y, this.canvas));
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.initParticles();
        });

        this.canvas.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });
    }

    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) { // Increased threshold for more edges
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(30, 144, 255, ${0.3 * (1 - distance / 150)})`; // Higher opacity
                    this.ctx.lineWidth = 1.5; // Slightly thicker lines
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        }

        this.drawLines();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PlexusAnimation();
});
