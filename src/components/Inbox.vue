<template>
  <div id="inbox">
        
        <router-view></router-view>
        
        <md-button class="md-fab md-primary md-fab-bottom-right compose-button" @click.native="composeNew">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Compose Email</md-tooltip>
        </md-button>

        <ox-mail-compose-group :windows="composeWindows"></ox-mail-compose-group>
    </div>
</template>

<script>

import Vue from 'vue';
import { mapState } from 'vuex';
import MailComposeGroup from './MailComposeGroup';

Vue.component('ox-mail-compose-group', MailComposeGroup);

export default {
  name: 'inbox',
  methods: {
    composeNew: function () {
      this.$store.dispatch('mailNewComposeWindow', {from: this.fromAddress});
    }
  },
  computed: mapState({
    uid: state => state.session.user.id,
    username: state => state.session.user.id,
    composeWindows: state => state.mail.compose_windows,
    fromAddress: state => {
      if (state.session.user.display_name) {
        return [[state.session.user.display_name, state.session.user.email1]];
      } else {
        return state.session.user.email1;
      }
    }
  })
}

</script>

<style lang="scss" scoped>
  button.md-fab-bottom-right {
    position: fixed;
  }
</style>