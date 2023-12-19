<template>
  <v-form v-model="vFormModelValid" validate-on="blur" @submit.prevent="handleSubmit">
    <v-row class="mb-3">
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Username</v-label>
        <v-text-field
          variant="outlined"
          class="pwdInput"
          color="primary"
          v-model="username.model"
          :rules="username.rules"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Password</v-label>
        <v-text-field
          variant="outlined"
          class="border-borderColor"
          type="password"
          color="primary"
          v-model="password.model"
          :rules="password.rules"
        ></v-text-field>
      </v-col>
      <v-col cols="12 " class="py-0">
        <div class="d-flex flex-wrap align-center w-100">
          <v-checkbox hide-details color="primary">
            <template v-slot:label class="">Remeber this Device</template>
          </v-checkbox>
          <div class="ml-sm-auto">
            <RouterLink
              to=""
              class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            >
              Forgot Password ?</RouterLink
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          size="large"
          rounded="pill"
          color="primary"
          class="rounded-pill"
          block
          type="submit"
          flat
          >Sign In</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInput } from '@/types/pages/form';
import { useAuthStore } from '@/stores/auth';

const checkbox = ref(false);

const username = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Username required. Please try again.'],
});

const password = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Password required. Please try again.'],
});

const vFormModelValid = ref<boolean | undefined>(undefined);

const authStore = useAuthStore();

const handleSubmit = async () => {
  if (vFormModelValid.value) {
    const success = await authStore.loginAccount(username.model, password.model);
    if (success) {
    }
  }
};
</script>
