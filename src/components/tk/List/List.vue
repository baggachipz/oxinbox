<template>
    <md-list :class="mdClass">
        <slot></slot>
    </md-list>
</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        name: 'ox-list',
        components: VueMaterial.mdList,
        props: {
            class: String
        },
        computed: {
            mdClass: function () {
                switch(this.class) {
                    case 'dense':
                        return 'md-dense';
                    case 'double-line':
                        return 'md-double-line';
                    case 'triple-line':
                        return 'md-triple-line';
                    default:
                        return this.class;
                }
            }
        }
    }

</script>