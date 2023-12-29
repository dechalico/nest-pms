import type { GlobalMesage } from '@/types/pages/error';

export const useGlobalMessageStore = defineStore('pageError', () => {
  const globalMessage = reactive<GlobalMesage>({ show: false, duration: 5000, type: 'success' });
  const showMessage = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success',
  ) => {
    globalMessage.message = message;
    globalMessage.title = title;
    globalMessage.show = true;
    globalMessage.type = type;
  };

  return {
    globalMessage,
    showMessage,
  };
});
