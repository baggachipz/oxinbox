<template>
    <transition name="fade">
        <md-list-item class="ox-mail-list-item" :class="{ unread: !mail.flags.seen }">
            <div class="mail-header" :id="mail.id">
                <ox-avatar :uname="mail.from[0][1]"></ox-avatar>
                    
                <div class="md-list-text-container" @click="toggleMail" @blur="hideMail">
                    <span :title="mail.from[0][1]">{{ mail.from[0][0] }}</span>
                    <span>{{ mail.subject }}</span>
                    <small>Received: {{ formattedReceivedDate }}</small>
                </div>

                <div class="md-list-action" v-show="mail.showBody">
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
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary">star</md-icon>
                    </md-button>
                </div>
            </div>

            <transition name="slide-down">
                <div class="mail-body" v-html="mail.body" v-show="mail.showBody"></div>
            </transition>

            <md-divider class="inset"></md-divider>
        </md-list-item>
    </transition>
</template>

<script>

    import moment from 'moment';
    import 'moment-timezone';

    export default {
        id: 'mail-list-item',
        props: [
            'mail',
            'index'
        ],
        computed: {
            timezone() {
                return this.$store.state.session.timezone;
            },
            formattedReceivedDate() {
                return moment(this.mail.received).calendar();
            }

        },
        methods: {
            loadMail(id, index, folder) {
                this.$store.dispatch('getMail', {id, index, folder});
            },
            hideMail() {
                this.$store.dispatch('hideMail', this.mail.id);
            },
            toggleMail() {
                if (this.mail && this.mail.showBody) {
                    this.$store.dispatch('hideAllMail');
                } else {
                    this.loadMail(this.mail.id, this.index, this.mail.folder);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .md-list-item-container {
        flex-wrap: wrap;
    }

    .md-list-text-container {
        cursor: pointer;
    }

    .mail-body {
      padding: 10px;
      background: #eee;
      border-radius: 5px;
      flex: 0 0 100%;
      width: 100%;
      overflow-y: scroll;
      overflow-x:auto;
      max-height: 800px;
    }

    .mail-header {
        display: flex;
        width: 100%;
        flex: 0 0 100%;
    }

    .mail-body-icons {
      float: right;
      text-align: right;
    }

    .ox-mail-list-item.unread {
        .mail-header span {
            font-weight: bold;
        }
        background-color: azure;
    }

    /*
    Transition classes
    */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .slide-down-enter, .slide-down-leave-to {
        height: 0;
    }

    // .slide-down-enter-active, .slide-down-leave-active {
    //     -webkit-transition: height 2s ease-in-out;
    //     -moz-transition: height .5s ease-in-out;
    //     -ms-transition: height .5s ease-in-out;
    //     -o-transition: height .5s ease-in-out;
    //     transition: height 2s ease-in-out;
    // }

</style>