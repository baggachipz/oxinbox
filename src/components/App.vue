<template>

    <div>
        <ox-toolbar v-on:toggleLeftSidenav="toggleLeftSidenav" v-if="loggedIn"></ox-toolbar>
        <ox-sidebar ref="leftSidebar" v-if="loggedIn"></ox-sidebar>
        <router-view></router-view> 
    </div>
    

</template>

<script>

    import Vue from 'vue';
    import Toolbar from './Toolbar';
    import Sidebar from './Sidebar';    

    import { mapGetters } from 'vuex';

    Vue.component('ox-toolbar', Toolbar);
    Vue.component('ox-sidebar', Sidebar);
    
    export default {
        methods: {
            toggleLeftSidenav() {
               this.$refs.leftSidebar.toggle();
            }
        },
        computed: mapGetters(['loggedIn'])
        
    }


</script>