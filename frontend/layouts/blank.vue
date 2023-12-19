<template>
  <v-app>
    <NuxtPage />
    <ClientOnly>
      <ErrorHolder />
    </ClientOnly>
  </v-app>
</template>

<script setup lang="ts">
import ErrorHolder from './widgets/errorHolder.vue';
</script>
