<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-brand-500/30 selection:text-brand-200">
    <!-- Global Header/Navbar -->
    <Navbar />

    <!-- Main Content Area -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<style>
/* Reset and body overrides if any */
body {
  margin: 0;
  padding: 0;
}
</style>
