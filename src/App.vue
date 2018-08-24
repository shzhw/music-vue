<template>
  <div id="app" @touchstart="moveStart" @touchmove="moving" @touchend="moveEnd">
    <m-header @show-menu="showMenu"></m-header>
    <tab v-model="curIndex"></tab>
    <div class="main">
      <swiper class="swiper" :options="swiperOption" ref="swiper" @slideChange="slideChange">
        <swiper-slide v-for="(item,i) in ['recommed', 'singer', 'rank', 'search']" :key="i">
          <keep-alive v-if="loadView.indexOf(i) !== -1">
            <router-view :name="item"></router-view> 
          </keep-alive>
          <loading class="loading" v-else size="large"></loading>
        </swiper-slide>
      </swiper>
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

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      swiperOption: {},
      curIndex: 0,
      loadView: [0],
      startX: 0,
      touch: false
    };
  },
  computed: {
    ...mapGetters(['alert'])
  },
  mounted() {
    let userinfo = Users.getUserinfo();
    this.setInfo(userinfo);
  },
  methods: {
    moveStart(e) {
      this.startX = e.touches[0].pageX;
      this.touch = true;
      if (this.startX < 15) {
        this.$refs.swiper.swiper.allowTouchMove = false;
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
      this.$refs.swiper.swiper.allowTouchMove = true;
    },
    showMenu() {
      this.$refs.userside.show();
    },
    slideChange() {
      this.curIndex = this.$refs.swiper.swiper.activeIndex;
    },
    ...mapActions({
      setInfo: 'setUserInfo'
    })
  },
  watch: {
    curIndex(now, old) {
      if (this.loadView.indexOf(now) === -1) this.loadView.push(now);
      if (now === this.$refs.swiper.swiper.activeIndex) {
        return;
      }
      this.$refs.swiper.swiper.slideTo(now, 200, false);
    }
  },
  components: {
    MHeader,
    Tab,
    Player,
    Alert,
    swiper,
    swiperSlide,
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
      .loading
        position: absolute
        top: 30%
        transform: translateY(-50%)
</style>
