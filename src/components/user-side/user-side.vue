<template>
  <div class="side_layer" v-if="isShow" @touchstart.stop="moveStart" @touchmove.stop="moving" @touchend.stop="moveEnd">
    <transition :name="showType?'':'faded'">
      <div class="side_bg" ref="bg" @click="hide" v-if="sideShow"></div>
    </transition>
    <transition :name="showType?'':'slide'">
      <dl class="side_box" ref="wrapper" v-if="sideShow">
        <dt class="side_header">
          <div class="user" v-if="userinfo">
            <div class="avatar"><img :src="userinfo.avatar" alt=""></div>
            <p class="name">{{userinfo.nickname?userinfo.nickname:userinfo.username}} <span class="level">lv.0</span></p>
          </div>
          <div class="default" v-else>
            <div class="desc"></div>
            <router-link class="login_btn" to="/login">立即登陆</router-link>
          </div>
        </dt>
        <dd class="side_content">
          <ul class="menu_list">
            <router-link tag="li" to="">个性皮肤<span class="flag">官方红</span></router-link>
            <router-link tag="li" to="/usercontent">个人中心</router-link>
          </ul>
          <ul class="menu_list">
            <router-link tag="li" to="">本地音乐</router-link>
            <router-link tag="li" to="">下载管理</router-link>
            <router-link tag="li" to="/mymusic/1">最近播放</router-link>
            <router-link tag="li" to="/mymusic">我喜欢的音乐</router-link>
          </ul>
          <ul class="menu_list">
            <router-link tag="li" to="">扫一扫</router-link>
            <router-link tag="li" to="">听歌识曲</router-link>
            <router-link tag="li" to="">关于我们</router-link>
          </ul>
        </dd>
        <dd class="side_foot">
          <a class="item_a" href="javascript:void(0)">夜间模式</a>
          <a class="item_a" href="javascript:void(0)">设置</a>
          <a class="item_a" href="javascript:void(0)" @click="loginout"><i class="icon icon-power-off"></i>注销</a>
        </dd>
      </dl>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex';
import { clearUserInfo } from '@/common/js/cache';
import { appbackMixin } from '@/common/js/mixin';

export default {
  mixins: [appbackMixin],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data() {
    return {
      boundary: 80,
      startX: 0,
      touch: false,
      isShow: false,
      sideShow: false,
      showing: false,
      showType: 0 // 0为正常，1为拖动
    };
  },
  methods: {
    loginout() {
      this.setUserinfo(null);
      clearUserInfo();
      this.hide();
      this.$router.push('/login');
    },
    moveStart(e) {
      this.startX = e.touches[0].pageX;
      this.touch = true;
    },
    moving(e) {
      if (this.touch) {
        let endX = e.touches[0].pageX;
        let offset = endX - this.startX;
        if (offset < 0 && this.$refs.wrapper) {
          this.$refs.wrapper.style.transform = `translateX(${offset}px)`;
          this.$refs.bg.style.opacity =
            1 - Math.abs(offset) / (window.innerWidth * 0.8);
        }
      }
    },
    moveEnd(e) {
      let endX = e.changedTouches[0].pageX;
      let offset = endX - this.startX;
      if (offset < -this.boundary) {
        this.$refs.wrapper.style.transition = 'all 0.3s';
        this.$refs.wrapper.style.transform += `translateX(${-window.innerWidth}px)`;
        this.hide();
      } else if (this.$refs.wrapper) {
        this.$refs.wrapper.removeAttribute('style');
        this.$refs.bg.removeAttribute('style');
      }
      this.touch = false;
    },
    startShow() {
      this.showType = 1;
      this.isShow = true;
      this.sideShow = true;
      this.showing = true;
      this.$nextTick(() => {
        this.$refs.wrapper.style.transform = `translateX(-100%)`;
        this.$refs.bg.style.opacity = 0;
      });
    },
    inShow(offset) {
      if (
        this.showing &&
        this.$refs.wrapper &&
        offset > 0 &&
        offset < window.innerWidth * 0.8
      ) {
        this.$refs.wrapper.style.transform = `translateX(-100%) translateX(${offset}px)`;
        this.$refs.bg.style.opacity =
          Math.abs(offset) / (window.innerWidth * 0.8);
      }
    },
    endShow(offset) {
      if (this.$refs.wrapper) {
        this.$refs.wrapper.style.transition = `all .3s`;
        if (offset > this.boundary) {
          // 显示
          this.$refs.wrapper.style.transform = '';
          if (this.timer) clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.$refs.wrapper.removeAttribute('style');
            this.$refs.bg.removeAttribute('style');
          }, 250);
        } else {
          // 隐藏
          this.$refs.wrapper.style.transform = `translateX(-100%)`;
          this.hide();
        }
      }

      this.showing = false;
      this.showType = 0;
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.sideShow = false;
      setTimeout(() => {
        this.isShow = false;
      }, 300); // 动画时间 .3s
    },
    ...mapMutations({
      setUserinfo: 'SET_USERINFO'
    })
  },
  watch: {
    isShow(now) {
      if (now && !this.showing) {
        setTimeout(() => {
          this.sideShow = now;
        });
      }
    },
    $route: {
      deep: true,
      handler(now, old) {
        if (now.path !== '/') {
          this.isShow = false;
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'
.side_layer
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  font-size: 14px
  .side_bg
    background: rgba(0, 0, 0, 0.5)
    width: 100%
    height: 100%
  .side_box
    position: absolute
    width: 80%
    top: 0
    bottom: 0
    background-color: $color-white
    color: $color-text-black
    .side_header
      height: 120px
      bg-image('header_bg')
      background-size: cover
      background-repeat: no-repeat
      color: $color-text-ll
      .user
        padding-top: 20px
        .avatar
          width: 60px
          height: 60px
          border-radius: 50%
          overflow: hidden
          margin: 0 0 7px 12px
          img
            width: 100%
            height: 100%
        .name
          line-height: 32px
          padding: 0 10px
          background-color: rgba(0, 0, 0, 0.5)
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
          font-size: 16px
          .level
            display: inline-block
            padding: 0 4px
            border: 1px solid $color-white
            border-radius: 6px
            line-height: 12px
            font-size: 12px
            font-style: italic
            margin-left: 6px
      .default
        .desc
          height: 80px
        .login_btn
          display: block
          width: 160px
          margin: 0 auto
          line-height: 26px
          border: 1px solid $color-white
          border-radius: 13px
          color: $color-text-ll
          text-align: center
          text-decoration: none
    .side_content
      padding-top: 5px
      .menu_list
        &:not(:last-child)
          border-bottom: 4px solid #ddd
        li
          padding-left: 10px
          height: 32px
          line-height: 32px
          transition: all 1s
          position: relative
          overflow: hidden
          &:after
            content: ''
            position: absolute
            top: 50%
            left: 50%
            width: 1px
            height: 1px
            transform: scale3d(0, 0, 1)
            background-color: rgba(0, 0, 0, 0.3)
            transition: all 1s
            opacity: 0
            border-radius: 50%
          &:active
            background-color: rgba(0, 0, 0, 0.4)
            color: #fff
            &:after
              animation: wave 0.5s
          .flag
            float: right
            margin-right: 10px
            padding: 0 10px
            line-height: 20px
            height: 20px
            background-color: #ddd
            border-radius: 14px
            font-size: 12px
            margin-top: 6px
    .side_foot
      position: absolute
      bottom: 0
      width: 100%
      height: 32px
      line-height: 32px
      display: flex
      border-top: 1px solid #ddd
      .item_a
        flex: 1
        text-align: center
        text-decoration: none
        color: $color-text-black
        .icon
          margin-right: 8px
@keyframes wave
  0%
    opcity: 0.2
    transform: scale3d(0, 0, 1)
  50%
    opacity: 0.8
  100%
    opcity: 0
    transform: scale3d(300, 200, 1)
&.slide-enter-active, &.slide-leave-active, &.faded-enter-active, &.faded-leave-active
  transition: all 0.3s
&.slide-enter, &.slide-leave-to
  transform: translate3d(-100%, 0, 0)
&.faded-enter, &.faded-leave-to
  opacity: 0
</style>
