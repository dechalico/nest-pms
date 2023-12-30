import { useAuthStore } from '@/stores/auth';

const excludes = ['auth-Login', 'auth-Register'];

export default defineNuxtRouteMiddleware((to, from) => {
  const routeName = to.name?.toString() ?? '';
  if (excludes.indexOf(routeName) > -1) return;

  const authStore = useAuthStore();
  if (!authStore.currentUser.authenticated) {
    return navigateTo('/auth/login');
  }
});
