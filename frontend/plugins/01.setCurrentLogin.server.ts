import { useAuthStore } from '@/stores/auth';
import { parseCookies } from 'h3';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.ssrContext) return;

  const authStore = useAuthStore();
  const { auth } = parseCookies(nuxtApp.ssrContext.event);
  const { success, data } = await useApiFetch('/admin/users/current-login', {
    method: 'GET',
    showError: false,
    headers: { authorization: `Bearer ${auth}` },
  });
  if (success && data) {
    const currentUser = authStore.currentUser;
    currentUser.authenticated = true;
    currentUser.logginDate = new Date();
    currentUser.user = {
      firstName: data.firstName,
      lastName: data.lastName,
      roles: data.roles,
    };
  }
});
