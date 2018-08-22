<template>
  <div id="app">
    <m-header></m-header>
    <tab v-model="curIndex"></tab>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <swiper class="swiper" :options="swiperOption" ref="swiper" @slideChange="slideChange">
      <swiper-slide v-for="(item,i) in ['recommed', 'singer', 'rank', 'search']" :key="i">
        <router-view :name="item"></router-view>
      </swiper-slide>
    </swiper>
    <router-view></router-view>
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
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      swiperOption: {},
      curIndex: 0
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
    slideChange() {
      this.curIndex = this.$refs.swiper.swiper.activeIndex;
    },
    ...mapActions({
      setInfo: 'setUserInfo'
    })
  },
  watch: {
    curIndex(now, old) {
      if (now === old) return;
      this.$refs.swiper.swiper.slideTo(now, 200, false);
    }
  },
  components: {
    MHeader,
    Tab,
    Player,
    Alert,
    swiper,
    swiperSlide
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable.styl'

#app, .swiper
  height: 100%
</style>
