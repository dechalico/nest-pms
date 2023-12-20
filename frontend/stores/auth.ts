import type { CurrentLogUser } from '@/types/account/user';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = reactive<CurrentLogUser>({ authenticated: false });

  const loginAccount = async (username: string, password: string): Promise<boolean> => {
    const payload = {
      username,
      password,
    };
    const { success, data } = await useApiFetch('/auth/login', {
      data: payload,
      method: 'POST',
      showError: true,
    });
    if (success && data) {
      currentUser.authenticated = true;
      currentUser.logginDate = new Date();
      currentUser.user = {
        firstName: data.firstName,
        lastName: data.lastName,
        roles: data.roles,
      };
    }
    return success;
  };

  return {
    currentUser,
    loginAccount,
  };
});
