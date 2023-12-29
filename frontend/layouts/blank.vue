<template>
  <v-app>
    <NuxtPage />
    <ClientOnly>
      <GlobalMessage />
    </ClientOnly>
  </v-app>
</template>

<script setup lang="ts">
import GlobalMessage from './widgets/globalMessageHolder.vue';
</script>
