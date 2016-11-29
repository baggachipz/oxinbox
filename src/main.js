import Vue from 'vue';
// import App from './App';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import store from './store';
import 'vue-material/dist/vue-material.css'

import Login from './components/Login';
import Inbox from './components/Inbox';
import MailFolders from './components/MailFolders';

Vue.use(VueMaterial);
Vue.use(VueRouter);

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

new Vue({
  store,
  router
}).$mount('#app');
