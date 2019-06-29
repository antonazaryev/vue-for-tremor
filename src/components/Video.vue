<template>
    <Configurations @configurations-change="configurationChanged" :width="configWidth" :height="configHeight">
        <youtube :video-id="videoId" :player-width="width" :player-height="height"></youtube>
    </Configurations>
</template>

<script>
    import Configurations from "./Configurations";
    export default {
        name: 'Video',
        components: {Configurations},
        props: ['videoId', 'defaultWidth', 'defaultHeight'],
        data: () => ({
            configWidth: null,
            configHeight: null
        }),
        methods: {
            configurationChanged({ width, height }) {
                this.configWidth = width;
                this.configHeight = height;
            }
        },
        computed: {
            width: function () {
                return this.configWidth ? this.configWidth : this.defaultWidth;
            },
            height: function () {
                return this.configHeight ? this.configHeight : this.defaultHeight;
            }
        }
    }
</script>
