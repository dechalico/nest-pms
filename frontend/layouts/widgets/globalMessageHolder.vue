<template>
  <section>
    <v-snackbar v-model="globalMessage.show" vertical :timeout="globalMessage.duration">
      <div class="text-subtitle-1 pb-2">{{ globalMessage.title }}</div>
      <p>{{ globalMessage.message }}</p>
      <template v-slot:actions>
        <v-btn :color="globalMessage.type" variant="text" @click="globalMessage.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script setup lang="ts">
import { useGlobalMessageStore } from '../../stores/globalMessage';
const { globalMessage } = useGlobalMessageStore();
</script>
