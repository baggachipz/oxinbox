<template>
    <div class="mail-compose-group">
        <ox-mail-compose-window v-for="(mail, index) in windows" :index="index" :key="index" @sentmail="showMailSuccess"></ox-mail-compose-window>
        <md-snackbar ref="mail_success">
            <span>{{ $t('mail.compose.success')}}</span>
        </md-snackbar>
    </div>
    
</template>

<script>

    import Vue from 'vue';
    import MailComposeWindow from './MailComposeWindow';

    Vue.component('ox-mail-compose-window', MailComposeWindow);
    
    export default {
        id: 'mail-compose-group',
        props: [
            'windows'
        ],
        methods: {
            showMailSuccess() {
                // eslint-disable-next-line
                console.log('success message');
                this.$refs.mail_success.open();
            }
        }
    };

</script>

<style scoped lang="scss">
    div.mail-compose-group {
        position: fixed;
        right: 100px;
        bottom: 0px;
        max-height: 50%;
        min-height: 200px;
        text-align: right;
        z-index: 2;

        .mail-compose-card {
            display: inline-block;
            height: 100%; 
            max-width: 50%;
            min-width: 300px;
            margin-left: 5px;

            .md-card-area {
                background: white;
            }
        }
    }
</style>