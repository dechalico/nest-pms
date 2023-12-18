import type { CurrentLogUser } from '@/types/account/user';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = reactive<CurrentLogUser>({ isLogin: false });

  return {
    currentUser,
  };
});
