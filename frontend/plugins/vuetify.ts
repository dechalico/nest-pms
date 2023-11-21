import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@/assets/scss/style.scss';
import { BLUE_THEME } from '@/themes/lightTheme';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'BLUE_THEME',
      themes: {
        BLUE_THEME,
      },
    },
    defaults: {
      VCard: {
        rounded: 'xl',
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VTextarea: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
      },
      VListItem: {
        minHeight: '45px',
      },
      VTooltip: {
        location: 'top',
      },
    },
  });

  app.vueApp.use(vuetify);
});
