<template>
    <ox-list class="custom-list triple-line" v-on:click="hideMail">
        <ox-mail-list-item v-for="mail in mails" :mail="mail" v-on:hideMail="hideMail"></ox-mail-list-item>
    </ox-list>
</template>

<script>

    import Vue from 'vue';
    import { mapState } from 'vuex';
    import MailListItem from './MailListItem';
    import List from './tk/List';

    Vue.component('ox-mail-list-item', MailListItem);
    Vue.use(List);

    export default {
        id: 'mail-list',
        computed: mapState({
            mails: state => state.mail.mails,
            mail: state => state.mail.mail
        }),
        methods: {
            loadMails() {
                this.$store.dispatch('getMails');
            },
            loadMail(id, folder) {
                this.$store.dispatch('getMail', {id, folder});
            },
            hideMail() {
                this.$store.dispatch('hideAllMail');
            },
        },
        mounted: function () {
            this.loadMails();
        }
    }
</script>

<style lang="scss" scoped>

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