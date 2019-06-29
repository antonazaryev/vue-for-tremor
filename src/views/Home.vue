<template>
  <div>
    <div class="configurations">
      <Configurations
              @configurations-change="configurationsChanged"
              title="General configurations"
              :width="defaultWidth"
              :height="defaultHeight"
      />
      <AddVideo @video-add="videoAdded"/>
    </div>
    <div class="videos">
      <Video
              v-for="video in videos"
              :key="video"
              :videoId="video"
              :defaultWidth="defaultWidth"
              :defaultHeight="defaultHeight"
      />
    </div>
  </div>
</template>

<script>
import Configurations from '@/components/Configurations.vue';
import Video from '@/components/Video.vue';
import AddVideo from "../components/AddVideo";

export default {
  name: 'home',
  components: {
    AddVideo,
    Configurations,
    Video
  },
  data: () => ({
    defaultWidth: 640,
    defaultHeight: 480,
    videos: []
  }),
  methods: {
    configurationsChanged({ width, height }) {
      this.defaultWidth = width;
      this.defaultHeight = height;
      console.log(width, height);
    },
    videoAdded(videoId) {
      this.videos.push(videoId);
    }
  }
}
</script>

<style lang="scss" scoped>
  .configurations {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .videos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
