import Vue from 'vue';
import VueMaterial from 'vue-material';
import I18n from 'vue-I18n';

import store from './store';
import router from './router';
import locales from './i18n/locales';

import App from './components/App';

import 'vue-material/dist/vue-material.css';
import './assets/sass/base.scss';



Vue.use(VueMaterial);
Vue.material.registerTheme('ox', {
  primary: 'blue',
  accent: 'pink',
  warn: 'deep-orange',
  background: {color: 'grey', hue: 100}
});
Vue.material.setCurrentTheme('ox')

Vue.use(I18n);
Vue.config.lang = 'en_US';
Vue.config.fallbackLang = 'en_US';

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
});


new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
