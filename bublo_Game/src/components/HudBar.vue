<template>
  <section class="card">
    <h1>Pop the bubbles!</h1>
    <p class="muted">
      Click/tap bubbles before they float away. Bigger bubbles are worth fewer points.
    </p>

    <!-- Buttons -->
    <div class="row gap">
      <PrimaryButton @click="startGame">Play Now</PrimaryButton>
      <PrimaryButton variant="ghost" @click="$router.push('/about')">How it works</PrimaryButton>
    </div>

    <!-- Live HUD -->
    <HudBar
      :score="score"
      :best="best"
      :lives="lives"
      :level="level"
      :status="status"
    />

    <!-- Game Canvas -->
    <GameCanvas
      :status="status"
      :level="level"
      :difficulty="difficulty"
      @scored="onScore"
      @missed="onMiss"
      @gameover="onGameOver"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import HudBar from "../components/HudBar.vue";
import GameCanvas from "../components/GameCanvas.vue";

// Game state
const status = ref("idle");      // idle, running, paused, gameover
const level = ref(1);
const difficulty = ref("normal");

const score = ref(0);
const best = ref(0);
const lives = ref(3);

// Event handlers from GameCanvas
function onScore(pts) {
  score.value += pts;
  if (score.value > best.value) best.value = score.value;
}

function onMiss() {
  lives.value -= 1;
  if (lives.value <= 0) {
    status.value = "gameover";
  }
}

function onGameOver() {
  status.value = "gameover";
}

// Button to start/restart game
function startGame() {
  score.value = 0;
  lives.value = 3;
  status.value = "running";
}
</script>
