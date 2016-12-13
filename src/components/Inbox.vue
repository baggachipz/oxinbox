<template>
  <div id="inbox" v-on:click="hideMail">
    
        <md-toolbar>
        
          <md-button class="md-icon-button" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
          </md-button>
          <h2 class="md-title"><em>inb</em>OX</h2>
        
          <form class="search-form" novalidate>
            <input type="text" placeholder="Search">
          </form>

          <md-avatar>
            <avatar :uid="uid"></avatar>
          </md-avatar>
        </md-toolbar>
        
        <md-sidenav class="md-left folders-list" ref="leftSidenav">
          <mail-folders></mail-folders>
        </md-sidenav>

        <div id="mails-list" v-on:click="hideMail">
          <md-list class="custom-list md-triple-line">
            <md-list-item v-for="mail in mails">
              <md-avatar>
                <avatar :uname="mail.from[0][1]"></avatar>
              </md-avatar>

              <div class="md-list-text-container" v-on:click="loadMail(mail.id, mail.folder)" v-on:blur="hideMail">
                <span :title="mail.from[0][1]">{{ mail.from[0][0] }}</span>
                <span>{{ mail.subject }}</span>
                <small>Received: {{ mail.received | formatDate }}</small>
                <div class="mail-body-icons" v-show="mail.showBody">
                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-primary">reply</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-primary">reply_all</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-primary">forward</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-primary">archive</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-primary">delete</md-icon>
                    </md-button>
                </div>
                <transition name="slide-down">
                  <div class="mail-body" v-html="mail.body" v-show="mail.showBody"></div>
                </transition>
                
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">star</md-icon>
              </md-button>
              

              <md-divider class="md-inset"></md-divider>
            </md-list-item>
          </md-list>
        </div>

        <md-button class="md-fab md-primary compose-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Compose Email</md-tooltip>
        </md-button>
    </div>
</template>

<script>

import Vue from 'vue';
import { mapState } from 'vuex';
import Avatar from './tk/Avatar';
import moment from 'moment';

Vue.component('avatar', Avatar);

export default {
  name: 'inbox',
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    loadMails() {
      this.$store.dispatch('getMails');
    },
    loadMail(id, folder) {
      this.$store.dispatch('getMail', {id, folder});
    },
    hideMail() {
      this.$store.dispatch('hideAllMail');
    }
  },
  computed: mapState({
    uid: state => state.session.user_id,
    mails: state => state.mail.mails,
    mail: state => state.mail.mail
  }),
  mounted: function () {
    this.loadMails();
  },
  filters: {
    formatDate: function (val) {
      // return moment(val).format('ddd MMM D h:mm a')
      return moment(val).fromNow();
    }
  }
}

</script>

<style lang="scss" scoped>

    @import '../assets/sass/definitions';

   
    .md-toolbar {
      background: $brand-primary;
      color: white;
      position:fixed;
      top:0;
      width:100%;
      z-index:2
    }

    .search-form {
      display: block;
      width: 70%;
      text-align: center;
      margin-right: 100px;
    }

    .search-form input {
      border: 0;
      color: white;
      width: 100%;
      border-radius: 2px;
      line-height: 25px;
      margin-left: 100px;
      padding: 5px 40px;
      font-size: 16px;
      background: #428BCA url('data:image/svg+xml;utf-8,<svg fill="%23aaaaaa" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>') no-repeat 5px 50%; 
    }

    #mails-list {
      width: 80%;
      margin: 64px auto 10px;
    }

    #mails-list div.md-avatar {
      align-self: flex-start;
    }

    #mails-list li.md-list-item button.md-list-action {
      align-self: flex-start;
    }

    .mail-body {
      padding: 10px;
      background: #eee;
      border-radius: 5px;
    }

    .mail-body-icons {
      float: right;
      text-align: right;
    }

    .compose-button {
      position: fixed;
      bottom: 10px;
      right: 20px;
      background: #3774A8;
      color: white;
    }

    .compose-button:hover {
      color: #3774A8;
    }
  
</style>