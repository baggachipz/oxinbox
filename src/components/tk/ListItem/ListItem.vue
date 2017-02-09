<template>

    <md-list-item :class="mdClass" :href="href" :target="target" :disabled="disabled" :md-expand-multiple="expandMultiple">
        <slot></slot>
    </md-list-item>

</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        name: 'ox-list',
        props: {
            class: String,
            href: String,
            target: String,
            disabled: Boolean,
            expandMultiple: Boolean
        },
        computed: {
            mdClass: this.class ? `md-${this.class}` : null
        },
        components: VueMaterial.mdListItem,
    }

</script>