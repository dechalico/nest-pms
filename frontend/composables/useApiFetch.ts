interface ApiOptions {
  pick?: never[];
  showError?: Boolean;
}

export const useApiFetch = async (route: string, options?: ApiOptions): Promise<any> => {
  const config = useRuntimeConfig();
  const url = new URL(route, config.public.apiBase);
  const { data, error, pending, refresh } = await useFetch(url.toString(), {
    pick: options?.pick,
  });

  if (options?.showError && error) {
  }

  return {
    data,
    error,
    pending,
    refresh,
  };
};
