<template>
    <div>
        <div class="bg"></div>
        
        <form novalidate method="post" action="/login" @submit.prevent="login">
            <md-card class="login-box">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title login-title"><img src="/static/logo-blue.png" alt="inbOX by Open-Xchange"></div>
                    </md-card-header-text>
                    <div class="login-error"><ox-inline-alert type="error" :message="loginError"></ox-inline-alert></div>
                </md-card-header>
                
                <md-card-content>
                    <md-input-container>
                        <label>{{ $t('login.UserName') }}</label>
                        <md-input tabindex="1" :value="username" @input="updateUsername"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>{{ $t('login.Password') }}</label>
                        <md-input type="password" tabindex="1" :value="password" @input="updatePassword"></md-input>
                    </md-input-container>
                </md-card-content>

                <md-card-actions class="login-actions">
                    <md-checkbox id="rememberme" name="rememberme" tabindex="1" :value="rememberme" class="md-primary" @change="updateRememberme">{{ $t('login.RememberMe') }}</md-checkbox>
                    <md-button type="submit" tabindex="1" class="md-primary md-raised">{{ $t('login.Login') }}</md-button>
                </md-card-actions>

            </md-card>
        </form>
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
          const store = this.$store;

          this.resetError();          

          this.$store.dispatch('login', {username: this.username, password: this.password, rememberme: this.rememberme}).then(function () {
              router.replace({name: 'inbox_default'});
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
      updateRememberme(val) {
          this.resetError();
          this.$store.commit(types.SESSION_LOGIN_FORM_SET_REMEMBERME, val);
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
    rememberme: state => state.session.form_rememberme,
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

    .login-title {
        color: #316795;
        font-weight: 900;
    }

    .login-error {
        position: absolute;
        margin: 5px 10px 0 150px;
    }

    .login-box {
        width: 30%;
        margin: 30px auto;
        background: #f5f5f5;
    }

    .login-actions {
        justify-content: space-between;
    }
    
</style>