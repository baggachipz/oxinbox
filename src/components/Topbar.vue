<template>
    <md-toolbar>
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
            <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title">inbOX</h2>
        <ox-search-bar></ox-search-bar>
        <ox-user-menu></ox-user-menu>
    </md-toolbar>
</template>

<script>

    import Vue from 'vue';
    import SearchBar from './SearchBar';
    import UserMenu from './UserMenu';
    
    Vue.component('ox-search-bar', SearchBar);
    Vue.component('ox-user-menu', UserMenu);
    
    export default {
        id: 'toolbar',
        methods: {
            toggleLeftSidenav: function() {
                this.$emit('toggleLeftSidenav');
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>
