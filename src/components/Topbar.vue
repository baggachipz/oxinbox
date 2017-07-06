<template>
    <md-toolbar id="ox-topbar">
        <div id="ox-topbar-logo">
            <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title" @click="refresh">inbOX</h2>
        </div>
        <div id="ox-topbar-search-bar">
            <ox-search-bar></ox-search-bar>
        </div>
        <div id="ox-topbar-user-menu">
            <ox-user-menu></ox-user-menu>
        </div>
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
            toggleLeftSidenav() {
                this.$emit('toggleLeftSidenav');
            },
            refresh() {
                this.$emit('refresh');
            }
        }
    }

</script>

<style lang="scss" scoped>
    #ox-topbar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 3;

    }
    #ox-topbar-logo {
        width: 15%;
        display: inline-block;

        h2 {
            display: inline-block;
            line-height: 64px;
            cursor: pointer;
        }

        button {
            margin: 12px 0;
        }
    }

    #ox-topbar-search-bar {
        width: 70%; 
        display: inline-block;
    }
    #ox-topbar-user-menu {
        width: 15%;
        display: inline-block;
        text-align: right;
    }
</style>
