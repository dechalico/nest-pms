import type { ApplicationError } from '@/types/pages/error';

export const usePageErrorStore = defineStore('pageError', () => {
  const error = reactive<ApplicationError>({ show: false, duration: 5000 });
  const showError = (title: string, message: string) => {
    error.message = message;
    error.title = title;
    error.show = true;
  };

  return {
    error,
    showError,
  };
});
