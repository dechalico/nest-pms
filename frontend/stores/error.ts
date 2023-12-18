import type { ApplicationError } from '@/types/pages/error';

export const usePageErrorStore = defineStore('pageError', () => {
  const errors = reactive<Array<ApplicationError>>([]);
  return {
    errors,
  };
});
