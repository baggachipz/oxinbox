<template>
    <md-sidenav class="folders-list md-left md-fixed" ref="sidenav">
        
        <md-list>

            <md-list-item ref="mailFoldersList">
                <md-icon class="md-primary">markunread_mailbox</md-icon>
                <span>Email</span>
            </md-list-item>

            <mail-folders v-if="currentApp === 'inbox'" v-on:selectMailFolder="selectMailFolder"></mail-folders>

            <md-divider></md-divider>
            
            <md-list-item>    
                <md-icon class="md-primary">contacts</md-icon>
                <span>Contacts</span>
            </md-list-item>
            
            <md-divider></md-divider>
            
            <md-list-item>
                <md-icon class="md-primary">event</md-icon>
                <span>Calendar</span>
            </md-list-item>

        </md-list>  

    </md-sidenav>
</template>

<script>

    import Vue from 'vue';
    import { mapState } from 'vuex';
    import MailFolders from './MailFolders';

    Vue.component('mail-folders', MailFolders);

    export default {
        name: 'ox-sidebar',
        id: 'ox-sidebar',
        methods: {
            toggle () {
                this.$refs.sidenav.toggle();
            },
            selectMailFolder (id) {
                this.$store.dispatch('setMailDisplayFolder', id);
                this.$emit('setMailDisplayFolder', id);
                this.$router.push('/inbox/' + encodeURIComponent(id));
                this.toggle();
            }
        },
        computed: mapState({
            currentApp: state => state.app.currentApp
        })
    }

</script>