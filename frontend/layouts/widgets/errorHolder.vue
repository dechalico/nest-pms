<template>
  <section>
    <v-snackbar v-model="error.show" vertical :timeout="error.duration">
      <div class="text-subtitle-1 pb-2">{{ error.title }}</div>
      <p>{{ error.message }}</p>
      <template v-slot:actions>
        <v-btn color="error" variant="text" @click="error.show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script setup lang="ts">
import { usePageErrorStore } from '../../stores/error';
const { error } = usePageErrorStore();
</script>
