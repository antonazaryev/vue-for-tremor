<template>
    <div>
        <md-dialog-prompt
                :md-active.sync="active"
                v-model="value"
                md-title="Add new video"
                md-input-placeholder="Enter YouTube link..."
                md-confirm-text="Add"
                @md-confirm="addConfirmed"
                @md-cancel="clear"
        />
        <md-button class="md-icon-button md-raised md-primary" @click="active = true">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { getIdFromURL } from 'vue-youtube-embed'

    export default {
        name: 'AddVideo',
        data: () => ({
            active: false,
            value: null
        }),
        methods: {
            addConfirmed() {
                const videoId = getIdFromURL(this.value);
                if (videoId && videoId !== '') {
                    this.$emit('video-add', videoId);
                }
                this.clear();
            },
            clear() {
                this.value = '';
            }
        },
        created() {
            this.value = '';
        }
    }
</script>