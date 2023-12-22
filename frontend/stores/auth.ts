import type { CurrentLogUser, User } from '@/types/account/user';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = reactive<CurrentLogUser>({ authenticated: false });

  const loginAccount = async (username: string, password: string): Promise<boolean> => {
    const payload = {
      username,
      password,
    };
    const { error, data } = await useApiFetch<User>('/auth/login', {
      body: payload,
      method: 'POST',
      showError: true,
    });
    if (!error.value && data.value) {
      currentUser.authenticated = true;
      currentUser.logginDate = new Date();
      currentUser.user = {
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        roles: data.value.roles,
      };
    }

    return !!data.value;
  };

  return {
    currentUser,
    loginAccount,
  };
});
