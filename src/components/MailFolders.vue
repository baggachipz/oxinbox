<template>
    
    <md-list class="md-dense">
        <ox-mail-sub-folder :folder="inbox" :recursive="false" v-on:selectMailFolder="selectMailFolder"></ox-mail-sub-folder>
        <ox-mail-sub-folder v-for="subfolder in inbox.sub_folders" :folder="subfolder" :key="subfolder"  v-on:selectMailFolder="selectMailFolder"></ox-mail-sub-folder>
    </md-list>  
    
</template>

<script>

import Vue from 'vue';
import MailSubFolders from './MailSubFolders';

Vue.component('ox-mail-sub-folder', MailSubFolders);

export default {
    id: 'mail-folders',
    methods: {
        getFolders () {
            this.$store.dispatch('getDefaultMailFolders');
        },
        selectMailFolder (id) {
            this.$emit('selectMailFolder', id);
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