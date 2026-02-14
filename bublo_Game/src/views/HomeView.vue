<template>
  <section class="card">
    <h1>Pop the bubbles!</h1>
    <p class="muted">
      Click/tap bubbles before they float away. Bigger bubbles are worth fewer points.
    </p>

    <div class="row gap">
      <PrimaryButton @click="$router.push('/game')">Play Now</PrimaryButton>
      <PrimaryButton variant="ghost" @click="$router.push('/about')">How it works</PrimaryButton>
    </div>

    <div class="preview">
      <img src="../assets/bg.svg" alt="background" />
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
</script>
