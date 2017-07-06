<template>
    <md-list-item ref="parentListItem">
        
        <ox-folder-icon :class="isRecursive" @click.native="selectFolder(folder.id)" :folder="folder"></ox-folder-icon>
        <span :class="isRecursive" @click="selectFolder(folder.id)">{{ folder.title }}</span>
        
        <md-button type="button" class="md-button-ghost" v-if="!recursive || !folder.has_subfolders" @click.native="selectFolder(folder.id)"></md-button>
        
        <md-list-expand v-if="folder.has_subfolders && recursive">
            <md-list>
                <ox-mail-sub-folder v-if="isActive" v-for="subfolder in folder.sub_folders" :folder="subfolder" :key="subfolder" v-on:selectMailFolder="selectFolder"></ox-mail-sub-folder>
            </md-list>
        </md-list-expand>
    </md-list-item>
</template>

<script>

    export default {
        name: 'ox-mail-sub-folder',
        props: {
            folder: {
                required: true
            },
            recursive: {
                type: Boolean,  
                default: true
            }
        },
        methods: {
            loadFolder () {
                this.$store.dispatch('getMailFolders', this.folder.id);
            },
            selectFolder (id) {
                this.$emit('selectMailFolder', id);
            }
        },
        computed: {
            isRecursive: function () {
                return {
                    'ox-mail-folder-select': this.recursive && this.folder.has_subfolders
                };
            },
            isActive: function () {
                return this.$refs.parentListItem.active;
            }
        },
        mounted() {
            if (this.recursive && this.folder.has_subfolders) this.loadFolder();
        }
    }

</script>

<style>

    .ox-mail-folder-select {
        z-index: 3;
        cursor: pointer;
    }

</style>