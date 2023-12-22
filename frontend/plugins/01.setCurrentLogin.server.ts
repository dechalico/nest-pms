import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/account/user';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.ssrContext) return;

  const authStore = useAuthStore();
  const auth = useCookie('auth');
  const { error, data } = await useApiFetch<User>('/admin/users/current-login', {
    method: 'GET',
    showError: false,
    headers: { authorization: `Bearer ${auth}` },
  });

  if (!error.value && data.value) {
    const currentUser = authStore.currentUser;
    currentUser.authenticated = true;
    currentUser.logginDate = new Date();
    currentUser.user = {
      firstName: data.value.firstName,
      lastName: data.value.lastName,
      roles: data.value.roles,
    };
  }
});
