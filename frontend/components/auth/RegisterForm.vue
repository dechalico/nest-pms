<template>
  <v-form v-model="vFormModelValid" @submit.prevent="handleSubmit">
    <v-row class="d-flex mb-3">
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">First Name</v-label>
        <v-text-field
          v-model.trim="firstName.model"
          :rules="firstName.rules"
          variant="outlined"
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Last Name</v-label>
        <v-text-field
          v-model.trim="lastName.model"
          :rules="lastName.rules"
          variant="outlined"
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Email Address</v-label>
        <v-text-field
          v-model.trim="email.model"
          :rules="email.rules"
          variant="outlined"
          type="email"
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Username</v-label>
        <v-text-field
          v-model.trim="username.model"
          :rules="username.rules"
          variant="outlined"
          type="email"
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-label class="font-weight-medium mb-1">Password</v-label>
        <v-text-field
          v-model.trim="password.model"
          :rules="password.rules"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          color="primary"
          :append-inner-icon="showPassword ? EyeIcon : EyeOffIcon"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-btn type="submit" color="primary" rounded="pill" size="large" block flat>Sign up</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import type { FormInput } from '@/types/pages/form';
import { validEmail } from '@/utils/validation';
import { EyeIcon, EyeOffIcon } from 'vue-tabler-icons';

const firstName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'First name required. Please try again.'],
});
const lastName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Last name required. Please try again.'],
});
const email = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [
    (v: string) => !!v || 'Email required. Please try again.',
    (v: string) => validEmail(v) || 'Provide valid email. Please try again.',
  ],
});
const username = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [
    (v: string) => !!v || 'Username required. Please try again.',
    (v: string) => v.length >= 6 || 'Username minimum of eight characters',
  ],
});
const password = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [
    (v: string) => !!v || 'Password required. Please try again.',
    (v: string) => v.length >= 8 || 'Password minimum of eight characters',
  ],
});
const showPassword = ref(false);
const vFormModelValid = ref<boolean | undefined>(undefined);

const handleSubmit = async () => {
  if (!vFormModelValid.value) return;

  const route = useRoute();

  const payload = {
    firstName: firstName.model,
    lastName: lastName.model,
    email: email.model,
    username: username.model,
    password: password.model,
    token: route.query.token ?? '',
    guid: route.query.guid ?? '',
  };
  const { status } = await useApiFetch('/auth/register', {
    body: payload,
    showError: true,
    method: 'POST',
  });
  if (status.value === 'success') {
    navigateTo('/auth/login');
  }
};
</script>
