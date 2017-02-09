<template>
    <md-toolbar>
        <ox-menu-launcher v-on:toggleLeftSidenav="toggleLeftSidenav"></ox-menu-launcher>
        <ox-search-bar></ox-search-bar>
        <ox-user-menu></ox-user-menu>
    </md-toolbar>
</template>

<script>

    import Vue from 'vue';
    import MenuLauncher from './MenuLauncher';
    import SearchBar from './SearchBar';
    import UserMenu from './UserMenu';

    Vue.component('ox-menu-launcher', MenuLauncher);
    Vue.component('ox-search-bar', SearchBar);
    Vue.component('ox-user-menu', UserMenu);

    export default {
        id: 'toolbar',
        methods: {
            toggleLeftSidenav() {
                this.$emit('toggleLeftSidenav');
            }
        }
    }

</script>

<style lang="scss" scoped>

    @import '../assets/sass/definitions';

    .md-toolbar {
      background: $brand-primary;
      color: white;
      position:fixed;
      top:0;
      width:100%;
      z-index:2;
      justify-content: space-between;

      h2 {
        float: right;
        line-height:40px;
      }
    }

</style>
