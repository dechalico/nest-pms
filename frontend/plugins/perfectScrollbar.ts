import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';

export default defineNuxtPlugin((app) => {
  app.vueApp.use(PerfectScrollbarPlugin);
});
