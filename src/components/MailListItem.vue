<template>
    <div>
        <ox-avatar :uname="mail.from[0][1]"></ox-avatar>
            
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
            <md-icon class="primary">star</md-icon>
        </md-button>
        

        <md-divider class="inset"></md-divider>
    </div>
</template>

<script>

    import moment from 'moment';

    export default {
        id: 'mail-list-item',
        props: [
            'mail'
        ],
        filters: {
            formatDate: function (val) {
                // return moment(val).format('ddd MMM D h:mm a')
                return moment(val).fromNow();
            }
        },
        methods: {
            loadMail(id, folder) {
                this.$store.dispatch('getMail', {id, folder});
            },
            hideMail() {
                this.$emit('hideMail');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mail-body {
      padding: 10px;
      background: #eee;
      border-radius: 5px;
    }

    .mail-body-icons {
      float: right;
      text-align: right;
    }

</style>