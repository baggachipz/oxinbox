<template>

    <div>
        <ox-topbar v-on:toggleLeftSidenav="toggleLeftSidenav" v-if="loggedIn" v-on:refresh="refreshView"></ox-topbar>
        <ox-sidebar ref="sidebar" v-if="loggedIn"></ox-sidebar>
        <router-view></router-view> 
    </div>
    
</template>

<script>

    import Vue from 'vue';
    import Topbar from './Topbar';
    import Sidebar from './Sidebar';    

    import { mapGetters } from 'vuex';

    Vue.component('ox-topbar', Topbar);
    Vue.component('ox-sidebar', Sidebar);
    
    export default {
        methods: {
            toggleLeftSidenav() {
               this.$refs.sidebar.toggle();
            },
            refreshView() {
                this.$store.dispatch('refreshView');
            }
        },
        computed: mapGetters(['loggedIn'])
        
    }


</script>