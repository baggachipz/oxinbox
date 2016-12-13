import Vue from 'vue';
import Vuex from 'vuex';
import session from './modules/session';
import mail from './modules/mail';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    session,
    mail
  },
  strict: debug,
  plugins: []
});
