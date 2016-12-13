import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import I18n from 'vue-I18n';

import store from './store';
import locales from './i18n/locales';

import 'vue-material/dist/vue-material.css';
import './assets/sass/base.scss';

import Login from './components/Login';
import Inbox from './components/Inbox';
import MailFolders from './components/MailFolders';

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(I18n);

Vue.config.lang = 'en_US';
Vue.config.fallbackLang = 'en_US';

Vue.component('mail-folders', MailFolders);

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/inbox', name: 'inbox', component: Inbox },
  { path: '/', redirect: '/inbox' }
];

const router = new VueRouter({routes, mode: 'history'});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getters.loggedIn) {
    next({
      name: 'login'
    });
  } else {
    next();
  }
});

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

new Vue({
  store,
  router
}).$mount('#app');
