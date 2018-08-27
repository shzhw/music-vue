<template>
<transition name="slideUp">
  <div class="user_content">
    <div class="user_info">
      <div class="name_box">
        <img :src="userinfo.avatar" alt="" class="avatar">
        <span class="text">{{userinfo.nickname?userinfo.nickname:userinfo.username}}</span>
      </div>
      <div class="vip">
        <div class="left">
          <p class="name">活动中心</p>
          <p class="desc">今日听歌1小时</p>
        </div>
        <div class="line"></div>
        <div class="right">
          <p class="name">会员中心</p>
          <p class="desc">千万专属曲库任意享</p>
        </div>
      </div>
    </div>
    <ul class="action_list">
      <router-link class="act_btn" :to="btn.url" tag="li" v-for="(btn, index) in btns" :key="index">
        <p class="icon icon-not-favorite"></p>
        <p class="name">{{btn.name}}</p>
        <p class="desc">{{btn.desc}}</p>
      </router-link>
    </ul>
  </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { appbackMixin } from '@/common/js/mixin';

export default {
  mixins: [appbackMixin],
  computed: {
    btns() {
      return [
        {
          icon: '',
          name: '本地音乐',
          desc: 0,
          url: ''
        },
        {
          icon: '',
          name: '下载音乐',
          desc: 0,
          url: ''
        },
        {
          icon: '',
          name: '最近播放',
          desc: this.playHistory.length,
          url: '/mymusic/1'
        },
        {
          icon: '',
          name: '我喜欢',
          desc: this.favoriteList.length,
          url: '/mymusic'
        }
      ];
    },
    ...mapGetters(['userinfo', 'favoriteList', 'playHistory'])
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.user_content
  position: fixed
  top: 44px
  bottom: 0
  z-index: 2
  width: 100%
  background-image: linear-gradient(to bottom, $color-bakcground-header 20px, $color-theme-background 1px)
  color: $color-text
  .user_info
    height: 150px
    margin: 0 10px
    background: $color-theme-background
    border-radius: 6px
    .name_box
      padding-top: 20px
      text-align: center
      font-size: 18px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
        overflow: hidden
      .text
        display: inline-block
        max-width: 100px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
    .vip
      display: flex
      height: 65px
      margin-top: 5px
      .line
        flex: 0
        border-left: 1px solid $color-text-d
        height: 30px
        margin-top: 16px
      .left, .right
        flex: 1
        text-align: center
        .name
          margin: 10px 0
        .desc
          font-size: 12px
          color: $color-text-d
  .action_list
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    text-align: center
    .act_btn
      flex: 0 0 30%
      margin-top: 25px
      .icon
        font-size: 35px
        margin: 0 auto
        color: $color-theme
      .name
        margin: 15px 0 10px
      .desc
        color: $color-text-d
&.slideUp-enter-active, &.slideUp-leave-active
  transition: all 0.3s
&.slideUp-enter, &.slideUp-leave-to
  transform: translate3d(0, 100%, 0)
</style>
