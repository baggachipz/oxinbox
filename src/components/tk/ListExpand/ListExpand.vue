<template>
    <md-list-expand><slot></slot></md-list-expand>
</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        name: 'ox-list-expand',
        components: VueMaterial.mdListExpand
    }

</script>