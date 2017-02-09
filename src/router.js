import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/Login';
import Inbox from './components/Inbox';

import store from './store';

Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/inbox', name: 'inbox', component: Inbox },
  { path: '/', redirect: '/inbox' }
];

const router = new VueRouter({routes, mode: 'history'});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getters.loggedIn) {

    store.dispatch('autologin').then(() => {
      next();
    }).catch(() => {
      next({
        name: 'login'
      });
    });

  } else {
    next();
  }
});

export default router;