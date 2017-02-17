<template>
    <md-icon>{{ icon }}</md-icon>
</template>

<script>

    export default {
        name: 'ox-folder-icon',
        props: {
            folder: {
                required: true
            }
        },
        computed: {
            icon () {
                switch(this.folder.standard_folder_type) {
                    case 7: 
                        // inbox
                        return 'inbox';
                    case 9:
                        // drafts
                        return 'drafts';
                    case 10:
                        // sent
                        return 'email';
                    case 11: 
                        // spam
                        return 'security';
                    case 12:
                        // trash
                        return 'delete';
                    default:
                        return 'folder';
                }
            }
        }
    }

</script>
