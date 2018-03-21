import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import '@/common/stylus/index.styl';

// import VConsole from 'vconsole';
// window.vConsole = new VConsole();

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('@/common/images/default.png')
});

fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
