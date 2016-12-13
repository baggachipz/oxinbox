<template>
    <transition name="slide-fade">
        <div v-if="message" :class="type">
            <md-icon>{{ type }}</md-icon><div class="msg">{{ message }}</div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'inline-alert',
        props: {
            type: String,
            message: String
        }
    }
</script>

<style scoped>
    .error {
        color: red;
    }
    .warning {
        color: yellow;
    }
    .info {
        color: blue;
    }
    .msg {
        margin-left: 30px; 
    }
    i.md-icon {
        float: left;
    }

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>