import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueI18n from 'vue-I18n';
import tk from './components/tk';

import store from './store';
import router from './router';
import locales from './i18n/locales';

import App from './components/App';

import 'vue-material/dist/vue-material.css';
import './assets/sass/base.scss';



Vue.use(VueMaterial);
Vue.use(tk);
Vue.material.registerTheme('ox', {
  primary: 'blue',
  accent: 'pink',
  warn: 'deep-orange',
  background: {color: 'grey', hue: 100}
});
Vue.material.setCurrentTheme('ox')

Vue.use(VueI18n);
Vue.config.lang = 'en_US';
Vue.config.fallbackLang = 'en_US';

const i18n = new VueI18n({locale: Vue.config.lang, messages: locales});

new Vue({
  store,
  router,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
