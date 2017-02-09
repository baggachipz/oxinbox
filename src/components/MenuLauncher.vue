<template>
    <div class="top-menu-launcher">
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title">inbOX</h2>
    </div>
</template>

<script>
    export default {
        name: 'menu-launcher',
        props: [
            'sideNav'
        ],
        methods: {
            toggleLeftSidenav() {
                this.$emit('toggleLeftSidenav');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>