<template>
  <section class="home">
    <h1>Welcome to Bubble Pop!</h1>
    <p>
      Click/tap bubbles to pop them. Letting a bubble escape costs a life. Level increases with score.
    </p>

    <!-- Mini preview of game -->
    <div class="game-preview">
      <canvas ref="previewCanvas" width="300" height="200"></canvas>

      <!-- HUD overlay -->
      <div class="hud">
        <p>Score: {{ score }}</p>
        <p>Lives: {{ lives }}</p>
        <p>Level: {{ level }}</p>
      </div>
    </div>

    <button @click="$router.push('/game')" class="play-btn">
      Play Game
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Game state
const previewCanvas = ref(null);
const score = ref(0);
const lives = ref(3);
const level = ref(1);

// Load pop sound
const popSound = new Audio("/pop.mp3"); // Place a pop.mp3 in your public folder

onMounted(() => {
  const canvas = previewCanvas.value;
  const ctx = canvas.getContext("2d");

  class Bubble {
    constructor() {
      this.reset();
      this.popRadius = 0;       // for pop animation
      this.isPopping = false;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.radius = Math.random() * 15 + 5;
      this.speed = Math.random() * 1.5 + 0.5 + level.value * 0.1;
      this.popped = false;
      this.isPopping = false;
      this.popRadius = 0;
    }

    draw() {
      if (this.isPopping) {
        // Draw pop animation
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.popRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.popRadius / this.radius})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        this.popRadius += 1;
        if (this.popRadius >= this.radius * 1.5) {
          this.reset();
        }
      } else {
        // Normal bubble
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(173, 216, 230, 0.7)`;
        ctx.fill();
      }
    }

    update() {
      if (!this.isPopping) {
        this.y -= this.speed;
        if (this.y + this.radius < 0 && !this.popped) {
          lives.value = Math.max(lives.value - 1, 0);
          this.reset();
        }
      }
      this.draw();
    }

    isClicked(mx, my) {
      const dx = mx - this.x;
      const dy = my - this.y;
      return Math.sqrt(dx * dx + dy * dy) < this.radius;
    }

    pop() {
      this.isPopping = true;
      this.popRadius = 0;
      popSound.currentTime = 0;
      popSound.play();
    }
  }

  const bubbles = [];
  const maxBubbles = 20;
  for (let i = 0; i < maxBubbles; i++) bubbles.push(new Bubble());

  // Handle clicks
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    bubbles.forEach((b) => {
      if (!b.popped && !b.isPopping && b.isClicked(mx, my)) {
        score.value += Math.max(10 - Math.floor(b.radius), 1);
        b.pop();
        // Level up every 50 points
        level.value = Math.floor(score.value / 50) + 1;
      }
    });
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((b) => b.update());
    requestAnimationFrame(animate);
  }

  animate();
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.game-preview {
  position: relative;
  margin: 1.5rem auto;
  width: 300px;
  height: 200px;
  border: 2px solid #00f;
  border-radius: 10px;
  overflow: hidden;
}

.hud {
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  z-index: 10;
}

.play-btn {
  background-color: #00bfff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.play-btn:hover {
  background-color: #0099cc;
}
</style>
