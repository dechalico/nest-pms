import { usePageErrorStore } from '@/stores/error';
import type { UseFetchOptions } from '#app';
import { defu } from 'defu';

interface ApiOptions<T> extends UseFetchOptions<T> {
  showError?: boolean;
}

export function useApiFetch<T>(url: string, options: ApiOptions<T> = {}) {
  const config = useRuntimeConfig();
  const defaults: ApiOptions<T> = {
    baseURL: config.public.apiBase,
    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    key: url,

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
      if (options.showError) {
        const errorPageStore = usePageErrorStore();
        errorPageStore.showError(
          _ctx.response._data?.title ?? 'An error occured.',
          _ctx.response._data?.message ?? _ctx.error?.message,
        );
      }
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}
