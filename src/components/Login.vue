<template>
    <div>
        <h1 class="md-display-1 login-title"><em>inb</em>OX</h1>
        <div class="login-form">
            <form novalidate @submit.prevent="login">
                <md-input-container>
                    <label>User name</label>
                    <md-input :value="username" @input="updateUsername"></md-input>
                </md-input-container>
                <md-input-container>
                    <label>Password</label>
                    <md-input type="password" :value="password" @input="updatePassword"></md-input>
                </md-input-container>
                <div class="login-button-container">
                    <md-button type="submit" class="md-raised md-primary" @click="login">Login</md-button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>

import * as types from '../store/mutation-types';
import { mapState } from 'vuex';

export default {
  name: 'login',
  methods: {
      login: function () {
          
          const router = this.$router;

          /* eslint-disable no-console */
          this.$store.dispatch('login', {username: this.username, password: this.password}).then(function () {
              router.replace({name: 'inbox'});
          }).catch(function () {
              console.log('login error');  
          });
          /* eslint-enable no-console */
      },
      updateUsername(val) {
          this.$store.commit(types.SESSION_LOGIN_FORM_SET_USERNAME, val);
      },
      updatePassword(val) {
          this.$store.commit(types.SESSION_LOGIN_FORM_SET_PASSWORD, val);
      }

  },
  computed: mapState({
    username: state => state.session.form_username,
    password: state => state.session.form_password
  })
  
  
}

</script>

<style>

    .login-title {
        margin: 10px auto;
        width: 30%;
        min-width: 400px;
        color: #3774A8;
        font-weight: 900;
        text-shadow: 0 1px 5px rgba(0,0,0,.2);
    }

    .login-form {
        width: 30%;
        min-width: 400px;
        margin: 30px auto;
        background: #eee;
        border-radius: 5px;
        padding: 20px;
    }

    .login-button-container {
        text-align: right;
    }
</style>