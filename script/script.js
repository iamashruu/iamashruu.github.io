lucide.createIcons();

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
	if (entry.isIntersecting) {
	entry.target.classList.add('visible');
	}
});
}, { threshold: 0.2 });

sections.forEach(section => {
observer.observe(section);
});


// custom cursor 

const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];
let hue = 0;

const mouse = {
	x: undefined,
	y: undefined
};

window.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 5; i++) {
		particles.push(new Particle());
	}
});

class Particle {
constructor() {
	this.x = mouse.x;
	this.y = mouse.y;
	this.size = Math.random() * 5 + 1;
	this.speedX = Math.random() * 2 - 1;
	this.speedY = Math.random() * 2 - 1;
	this.color = `hsl(${hue}, 100%, 60%)`;
}

update() {
	this.x += this.speedX;
	this.y += this.speedY;
	this.size *= 0.96;
}

draw() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	ctx.fillStyle = this.color;
	ctx.fill();
}
}

function animate() {
// Clear instead of dark overlay
ctx.clearRect(0, 0, canvas.width, canvas.height);
hue += 3;

for (let i = 0; i < particles.length; i++) {
	particles[i].update();
	particles[i].draw();
	if (particles[i].size < 0.5) {
	particles.splice(i, 1);
	i--;
	}
}

requestAnimationFrame(animate);
}

animate();




