<template>
    <div>
        <ox-avatar :uname="mail.from[0][1]"></ox-avatar>
            
        <div class="list-text-container" v-on:click="loadMail(mail.id, mail.folder)" v-on:blur="hideMail">
        <span :title="mail.from[0][1]">{{ mail.from[0][0] }}</span>
        <span>{{ mail.subject }}</span>
        <small>Received: {{ mail.received | formatDate }}</small>
        <div class="mail-body-icons" v-show="mail.showBody">
            <ox-button class="icon-button list-action">
                <ox-icon class="md-primary">reply</ox-icon>
            </ox-button>
            <ox-button class="icon-button list-action">
                <ox-icon class="md-primary">reply_all</ox-icon>
            </ox-button>
            <ox-button class="icon-button list-action">
                <ox-icon class="md-primary">forward</ox-icon>
            </ox-button>
            <ox-button class="icon-button list-action">
                <ox-icon class="md-primary">archive</ox-icon>
            </ox-button>
            <ox-button class="icon-button list-action">
                <ox-icon class="md-primary">delete</ox-icon>
            </ox-button>
        </div>
        <transition name="slide-down">
            <div class="mail-body" v-html="mail.body" v-show="mail.showBody"></div>
        </transition>
        
        </div>

        <ox-button class="icon-button list-action">
        <ox-icon class="primary">star</ox-icon>
        </ox-button>
        

        <ox-divider class="inset"></ox-divider>
    </div>
</template>

<script>

    import Vue from 'vue';
    import Avatar from './tk/Avatar';
    import Button from './tk/Button';
    import Icon from './tk/Icon';
    import Divider from './tk/Divider';
    import moment from 'moment';

    Vue.use(Avatar);
    Vue.use(Button);
    Vue.use(Icon);
    Vue.use(Divider);

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