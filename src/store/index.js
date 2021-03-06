import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import session from './modules/session';
import mail from './modules/mail';
import contacts from './modules/contacts';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    app,
    session,
    mail,
    contacts
  },
  strict: debug,
  plugins: []
});
