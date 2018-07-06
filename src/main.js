import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import './common/js/bmob-key';

import '@/common/stylus/index.styl';

// import VConsole from 'vconsole';
// window.vConsole = new VConsole();

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('@/common/images/default.gif')
});

fastclick.attach(document.body);

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

let curtime = null;
document.addEventListener('plusready', function() {
  const routeList = ['/recommend', '/singer', '/rank', '/search'];
  /* eslint-disable no-undef  */
  plus.key.addEventListener(
    'backbutton',
    function() {
      if (vue.$store.state.disableBack) return;
      // 先判斷播放器浮層
      if (vue.$store.state.fullScreen) {
        vue.$store.commit('SET_FULL_SCREEN', false);
        return;
      }
      // 先判斷路徑
      const curPath = vue.$route.path;
      if (routeList.indexOf(curPath) === -1) {
        vue.$router.back();
        return;
      }
      // 再判斷時間
      if (!curtime || new Date() - curtime > 3000) {
        curtime = new Date();
        plus.nativeUI.toast('再按一次退出程序！');
      } else {
        plus.runtime.quit();
      }
    },
    false
  );
});
