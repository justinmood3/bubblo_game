<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
</script>

<style>
nav {
  margin-bottom: 1rem;
}
</style>
