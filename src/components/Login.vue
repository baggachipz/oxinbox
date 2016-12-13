<template>
    <div>
        <div class="bg"></div>
        
        <form novalidate method="post" action="/login" @submit.prevent="login">
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title"><em>inb</em>OX</div>
                    </md-card-header-text>
                </md-card-header>
                
                <md-card-content>
                    <md-input-container>
                        <label>User name</label>
                        <md-input tabindex="1" :value="username" @input="updateUsername"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Password</label>
                        <md-input type="password" tabindex="1" :value="password" @input="updatePassword"></md-input>
                    </md-input-container>
                </md-card-content>

                <md-card-actions>
                    <inline-alert type="error" :message="loginError"></inline-alert>
                    <md-button type="submit" tabindex="1" class="md-primary md-raised" @click="login">Login</md-button>
                </md-card-actions>

            </md-card>
        </form>
    </div>

</template>

<script>

import Vue from 'vue';
import * as types from '../store/mutation-types';
import InlineAlert from './tk/InlineAlert'
import { mapState } from 'vuex';

Vue.component('inline-alert', InlineAlert);

export default {
  name: 'login',
  methods: {
      login: function () {
          
          const router = this.$router;
          const store = this.$store;

          this.resetError();          

          this.$store.dispatch('login', {username: this.username, password: this.password}).then(function () {
              router.replace({name: 'inbox'});
          }).catch(function (e) {
              store.commit(types.SESSION_LOGIN_FAILURE, e);
          });

          return false;

      },
      updateUsername(val) {
          this.resetError();
          this.$store.commit(types.SESSION_LOGIN_FORM_SET_USERNAME, val);
      },
      updatePassword(val) {
          this.resetError();
          this.$store.commit(types.SESSION_LOGIN_FORM_SET_PASSWORD, val);
      },
      resetError() {
          if (this.loginError) {
            this.$store.commit(types.SESSION_LOGIN_RESET_ERROR);
          }
      }
  },
  computed: mapState({
    username: state => state.session.form_username,
    password: state => state.session.form_password,
    loginError: state => state.session.form_error
  })
}

</script>

<style lang="scss" scoped>

    @import '../assets/sass/definitions';

    .bg {
        min-height: 100%;
        width: 100%;
        height: auto;
        position: fixed;
        top: 0;
        left: 0;
        background: $brand-primary;
    }

    .md-title {
        color: #316795;
        font-weight: 900;
    }

    .md-card {
        width: 30%;
        margin: 30px auto;
        background: #f5f5f5;
    }
    
</style>