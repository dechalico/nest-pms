<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Sample Page">
        <template #action>
          <span>awasdf</span>
        </template>
        <div class=""><p class="text-body-1">This is a sample page</p></div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
</script>
