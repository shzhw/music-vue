<template>
  <div id="app" @touchstart="moveStart" @touchmove="moving" @touchend="moveEnd">
    <m-header @show-menu="showMenu"></m-header>
    <tab v-model="curIndex"></tab>
    <div class="main">
      <div ref="slider" style="width:100%;height:100%">
        <ul class="swiper">
          <li class="swiper_slide" v-for="(item,i) in ['recommed', 'singer', 'rank', 'search']" :key="i">
            <keep-alive v-if="loadView.indexOf(i) !== -1">
              <router-view :name="item"></router-view> 
            </keep-alive>
            <loading class="loading" v-else size="large"></loading>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
    <user-side ref="userside"></user-side>
    <player></player>
    <alert :alert="alert"></alert>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
import Alert from '@/base/alert/alert';
import Users from '@/api/Users';
import Loading from '@/base/loading/loading';
import UserSide from '@/components/user-side/user-side';

import { mapGetters, mapActions } from 'vuex';
import BScroll from 'better-scroll';

export default {
  name: 'app',
  data() {
    return {
      curIndex: 0,
      loadView: [0],
      startX: 0,
      touch: false,
      screenW: window.innerWidth
    };
  },
  computed: {
    ...mapGetters(['alert'])
  },
  created() {
    let userinfo = Users.getUserinfo();
    this.setInfo(userinfo);
  },
  mounted() {
    this.slider = new BScroll(this.$refs.slider, {
      click: false,
      scrollX: true,
      scrollY: false,
      bounce: false,
      momentum: false,
      snap: {
        loop: false,
        threshold: 0.3
      }
    });
    this.slider.on('scrollEnd', () => {
      this.curIndex = this.slider.getCurrentPage().pageX;
    });
  },
  methods: {
    moveStart(e) {
      this.startX = e.touches[0].pageX;
      this.touch = true;
      if (this.startX < 15) {
        this.$refs.userside.startShow();
      }
    },
    moving(e) {
      if (this.touch && this.startX < 15) {
        let endX = e.touches[0].pageX;
        let offset = endX - this.startX;
        this.$refs.userside.inShow(offset);
      }
    },
    moveEnd(e) {
      let endX = e.changedTouches[0].pageX;
      let offset = endX - this.startX;
      this.$refs.userside.endShow(offset);
      this.touch = false;
    },
    showMenu() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
      this.$refs.userside.show();
    },
    goPage(index) {
      if (this.loadView.indexOf(index) === -1) this.loadView.push(index);
      this.slider.goToPage(index, 0, 0);
    },
    ...mapActions({
      setInfo: 'setUserInfo'
    })
  },
  watch: {
    curIndex(now, old) {
      if (now === old) return;
      this.goPage(now);
    }
  },
  components: {
    MHeader,
    Tab,
    Player,
    Alert,
    Loading,
    UserSide
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable.styl'

#app
  height: 100%
  .main
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .swiper
      height: 100%
      width: 400%
      display: flex
      overflow: hidden
      .swiper_slide
        flex: 1
        position: relative
      .loading
        position: absolute
        top: 30%
        transform: translateY(-50%)
</style>
