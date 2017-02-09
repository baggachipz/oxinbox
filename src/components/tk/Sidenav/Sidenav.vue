<template>
    <md-sidenav class="md-left" ref="sidenav">
        <slot></slot>
    </md-sidenav>
</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        id: 'ox-sidenav',
        name: 'ox-sidenav',
        methods: {
            toggle() {
                this.$refs.sidenav.toggle();
            }
        },
        components: VueMaterial.mdSidenav
        
    }
</script>

<style lang="scss" scoped>
    
</style>