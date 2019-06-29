import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.use(VueMaterial);

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
