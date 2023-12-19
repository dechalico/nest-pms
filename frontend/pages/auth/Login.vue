<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <div class="boxed-auth-wrap">
            <v-card
              rounded="xl"
              elevation="10"
              class="px-sm-1 px-0 mx-auto index-2"
              max-width="450"
            >
              <v-card-item class="pa-sm-8">
                <div class="d-flex justify-center mb-5">
                  <LayoutFullLogoDark />
                </div>
                <AuthLoginForm />
              </v-card-item>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
/*-For Set Blank Layout-*/
definePageMeta({
  layout: 'blank',
});

import { usePageErrorStore } from '@/stores/error';
const pageErrorStore = usePageErrorStore();
pageErrorStore.showError(
  'Error Occured!',
  'An error occured. Please try again later or contact support.',
);
</script>
