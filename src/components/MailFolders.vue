<template>
    <div>
        <md-list class="md-dense">
            <md-list-item v-for="folder in folders">
                <md-icon>{{ folder.icon }}</md-icon> {{ folder.text }}
            </md-list-item>
        </md-list>
        <md-divider class="md-inset"></md-divider>
        <md-list>
            <md-list-item>
                <md-icon class="md-primary">contacts</md-icon>
                <span>Contacts</span>
            </md-list-item>
            <md-list-item>
                <md-icon class="md-primary">event</md-icon>
                <span>Calendar</span>
        </md-list>    
    </div>
</template>

<script>

export default {
    name: 'mail-folders',
    data: function () { 
        return {
            folders: [
                {
                    text: 'Inbox',
                    icon: 'inbox'
                },
                {
                    text: 'Drafts',
                    icon: 'drafts'
                },
                {
                    text: 'Sent objects',
                    icon: 'mail'
                },
                {
                    text: 'Spam',
                    icon: 'report'
                },
                {
                    text: 'Trash',
                    icon: 'delete'
                },
                {
                    text: 'Archive',
                    icon: 'archive'
                }
            ]
        }
    }
}

</script>

<style type="scss">
    
    
</style>