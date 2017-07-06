<template>
    <md-card class="mail-compose-card">
        <form novalidate @submit.stop.prevent="send">
            <md-card-area>
            
                <md-button @click.native="closeWindow" class="md-icon-button md-dense">
                    <md-icon>close</md-icon>
                </md-button>
            
                <md-card-content>
                    <v-select multiple :placeholder="$t('mail.compose.to')" :options="autocompleteData" @input="updateToAddresses" :on-search="searchAddresses" :debounce="250"></v-select>
                    <md-input-container>
                        <md-input :placeholder="$t('mail.compose.subject')" :value="mail.subject" @input="updateSubject"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <md-textarea :placeholder="$t('mail.compose.body')" :value="mail.body" @input="updateBody"></md-textarea>
                    </md-input-container>
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-icon-button">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="top">{{ $t('mail.compose.delete') }}</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="top">{{ $t('mail.compose.save') }}</md-tooltip>
                    </md-button>
                    <md-button @click.native="send" class="md-raised md-primary md-dense"><md-icon>send</md-icon> {{ $t('mail.compose.send') }}</md-button>
                </md-card-actions>
            </md-card-area>
        </form>
    </md-card>
</template>

<script>

    import vSelect from 'vue-select';
    import contactsApi from '../api/contacts';
    import debounce from 'debounce';

    export default {
        id: 'ox-mail-compose-window',
        props: [
            'index'
        ],
        created() {
            // set the body update to not happen on every single keystroke
            this.updateBody = debounce(this.updateBody, 500);
        },
        data: () => {
            return {
                autocompleteData: []
            }
        },
        computed: {
            session() { return this.$store.state.session.session },
            mail() {return this.$store.state.mail.compose_windows[this.index] }
        },
        methods: {
            updateSubject(val) {
                this.$store.dispatch('mailComposeUpdateSubject', {index: this.index, subject: val});
            },
            updateBody(val) {
                this.$store.dispatch('mailComposeUpdateBody', {index: this.index, body: val});
            },
            updateToAddresses(val) {    
                this.$store.dispatch('mailComposeUpdateToAddresses', {index: this.index, addresses: val});
            },
            searchAddresses(search, loading) {
                if (search && search.length > 2) {
                    loading(true);
                    contactsApi.autocomplete(this.session, search).then(data => {
                        this.autocompleteData = data;
                        loading(false);
                    });
                }
            },
            send() {
                this.$store.dispatch('mailComposeSend', {index: this.index, mail: this.mail})
                .then(() => {
                    this.$emit('sentmail');
                })
                .catch((e) => {
                    // eslint-disable-next-line
                    console.log(e)
                });
            },
            closeWindow() {
                // TODO ask to save draft
                this.$store.dispatch('mailComposeClose', this.index);
            }
        },
        components: {vSelect}
    }

</script>

<style lang="scss" scoped>

</style>