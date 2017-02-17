<template>
  <div id="inbox" v-on:click="hideMail">
        
        <ox-mail-list ref="mailsList"></ox-mails-list>
        
        <md-button class="md-fab md-primary md-fab-bottom-right compose-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Compose Email</md-tooltip>
        </md-button>
    </div>
</template>

<script>

import Vue from 'vue';
import MailList from './MailList';


Vue.component('ox-mail-list', MailList);



export default {
  name: 'inbox',
  methods: {
    hideMail() {
        this.$refs.mailsList.hideMail();
    }
  }
}

</script>

<style lang="scss" scoped>

    @import '../assets/sass/definitions';

   
    

    
  
</style>