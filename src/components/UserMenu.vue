<template>
    <md-menu>
        <md-button md-menu-trigger>
            <ox-avatar :uid="uid"></ox-avatar>
        </md-button>
        <md-menu-content>
            <md-menu-item v-on:click.native="logout"><md-icon>power_settings_new</md-icon><span>Log out</span></md-menu-item>
            <md-menu-item disabled><md-icon>settings</md-icon><span>Settings</span></md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>

import { mapState } from 'vuex';

export default {
    id: 'user-menu',
    methods: {
        logout() {
            this.$emit('logout');
            this.$store.dispatch('logout').then(() => {
                window.location.href = '/login';
            });
        }
    },
    computed: mapState({
        uid: state => state.session.user.id,
        username: state => state.session.user.id
    })
}
</script>

<style lang="scss" scoped>

</style>