<template>
    <md-avatar>
        <img class="md-avatar" :src="avatar">
    <md-avatar>
</template>

<script>

    import VueMaterial from 'vue-material';

    export default {
        name: 'ox-avatar',
        props: ['uid', 'uname'],
        computed: {
            avatar: function() {
                if (this.uid) {
                    return '/ajax/image/user/picture?id=' + this.uid;
                } else if (this.uname) {
                    return '/ajax/halo/contact/picture?email=' + this.uname;
                } else {
                    return '/static/ic_account_circle_black_24px.svg';
                }

            }
        },
        components: VueMaterial.mdAvatar
    }
</script>

<style scoped>
    .md-avatar {
        background-image: url('data:image/svg+xml;utf-8,<svg fill="%23777777" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
    }
</style>