<template>
    <md-icon><slot></slot></md-icon>
</template>

<script>
    import VueMaterial from 'vue-material';
    
    export default { 
        name: 'ox-icon',
        id: 'ox-icon',
        components: VueMaterial.mdIcon
    };
</script>