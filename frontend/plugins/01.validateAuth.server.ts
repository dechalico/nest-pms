import { useAuthStore } from '@/stores/auth';
import { parseCookies } from 'h3';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.ssrContext) return;

  const authStore = useAuthStore();
  const { auth } = parseCookies(nuxtApp.ssrContext.event);
  const result = await authStore.setCurrentLoginAccount(auth);
});
