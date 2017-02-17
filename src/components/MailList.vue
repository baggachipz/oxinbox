<template>
    <md-list id="mails-list" class="md-triple-line" v-on:click="hideMail">
        <md-list-item v-for="mail in mails">
            <ox-mail-list-item :mail="mail" v-on:hideMail="hideMail"></ox-mail-list-item>
        </md-list-item>
    </md-list>
</template>

<script>

    import Vue from 'vue';
    import { mapState } from 'vuex';
    import MailListItem from './MailListItem';
    
    Vue.component('ox-mail-list-item', MailListItem);
    
    export default {
        id: 'mail-list',
        computed: mapState({
            mails: state => state.mail.mails
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


</style>