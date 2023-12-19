import { usePageErrorStore } from '@/stores/error';

interface ApiOptions {
  pick: never[];
  showError: boolean;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data: any;
}

interface ApiFetchResult {
  success: boolean;
  data?: any;
  pending: Ref<boolean>;
  error?: any;
  refresh: (opts: any) => Promise<any>;
}

export const useApiFetch = async (
  route: string,
  options: Partial<ApiOptions>,
): Promise<ApiFetchResult> => {
  const config = useRuntimeConfig();
  const url = config.public.apiBase + route;

  const { data, error, pending, refresh } = await useFetch(url, {
    pick: options.pick,
    method: options.method ?? 'get',
    body: options.data,
  });

  if (options?.showError && error.value) {
    const errorPageStore = usePageErrorStore();
    errorPageStore.showError(
      error.value?.data.title ?? 'An error occured.',
      error.value?.data.message ?? error.value?.message,
    );
  }

  return {
    success: !!!error.value,
    pending,
    error: error,
    data: data,
    refresh: refresh,
  };
};
