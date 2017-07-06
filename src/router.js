import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/Login';
import Inbox from './components/Inbox';
import MailList from './components/MailList';

import store from './store';

Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'login', component: Login },
  { 
    path: '/inbox',
    component: Inbox,
    children: [
      {
        path: ':folder',
        name: 'inbox_folder',
        component: MailList,
        props: true
      },
      {
        path: '',
        name: 'inbox_default',
        component: MailList
      }
    ]
  },
  { path: '/', redirect: '/inbox' }
];

const router = new VueRouter({routes, mode: 'history'});

// handle autologin requests if possible
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