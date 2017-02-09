<template>
    <md-button :class="mdClass" :href="href" :type="type" :disabled="disabled">
</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        name: 'ox-button',
        props: ['class','href','type','disabled'],
        computed: {
            mdClass: function () {
                return this.class ? `md-${this.class}` : null;
            }
        },
        components: VueMaterial.mdButton
    }

</script>