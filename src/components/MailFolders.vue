<template>
    
    <md-list class="md-dense">
        <md-list-item>
            <ox-folder-icon :folder="inbox"></ox-folder-icon>
            <span>{{ inbox.title }}</span>
        </md-list-item>
        <md-list-item v-for="folder in inbox.sub_folders">
            <ox-folder-icon :folder="folder"></ox-folder-icon>
            <span>{{ folder.title }}</span>
        </md-list-item>
    </md-list>  
    
</template>

<script>

// import { mapState } from 'vuex';

export default {
    id: 'mail-folders',
    methods: {
        getFolders () {
            this.$store.dispatch('getDefaultMailFolders');
        }
    },
    computed: {
        inbox () {
            let folders = this.$store.state.mail.folders;
            
            if (folders.length && folders[0].sub_folders.length) {
                return folders[0].sub_folders[0];
            } else {
                return [];
            }
        }
    },
    mounted() {
        this.getFolders();
    } 
}

</script>

<style lang="scss" scoped>
    
    
</style>