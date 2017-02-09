<template>
    <ox-sidenav class="folders-list" ref="sidenav">
asf
    </ox-sidenav>
</template>

<script>

    import Vue from 'vue';
    import Sidenav from './tk/Sidenav';

    Vue.use(Sidenav);

    export default {
        name: 'ox-sidebar',
        id: 'ox-sidebar',
        methods: {
            toggle () {
                this.$refs.sidenav.toggle();
            }
        }
    }

</script>