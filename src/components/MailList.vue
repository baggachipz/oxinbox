<template>
    <div id="mail-list">
        <md-list class="md-triple-line">
            <ox-mail-list-item v-for="(mail, index) in mails" :mail="mail" :index="index" :key="index"></ox-mail-list-item>
        </md-list>

        <md-snackbar ref="list_error_display">
            <span>{{ list_error }}</span>
            <md-button class="md-primary" @click.native="loadMails">{{ $t('common.retry') }}</md-button>
        </md-snackbar>
        <md-snackbar ref="fetch_error_display">
            <span>{{ fetch_error }}</span>
        </md-snackbar>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { mapState } from 'vuex';
    import MailListItem from './MailListItem';
    
    Vue.component('ox-mail-list-item', MailListItem);
    
    export default {
        id: 'mail-list',
        computed: mapState({
            mails: state => state.mail.mails,
            list_error: state => state.mail.mails_list_error,
            fetch_error: state => state.mail.mails_fetch_error
        }),
        methods: {
            loadMails() {
                if (this.$refs.list_error_display) this.$refs.list_error_display.close();
                this.$store.dispatch('getMails');
            },
            hideAllMail() {
                this.$store.dispatch('hideAllMail');
            },
        },
        mounted: function () {
            this.$store.dispatch('setMailDisplayFolder', this.$route.params.folder);
        },
        watch: {
            list_error: function (err) {
                if (err) this.$refs.list_error_display.open();
            },
            fetch_error: function (err) {
                if (err) this.$refs.fetch_error_display.open();
            }
        }
        
    }
</script>

<style lang="scss" scoped>

    #mail-list {
      width: 80%;
      margin: 64px auto 10px;
    }

    #mail-list div.md-avatar {
      align-self: flex-start;
    }

    #mail-list li.md-list-item button.md-list-action {
      align-self: flex-start;
    }

</style>