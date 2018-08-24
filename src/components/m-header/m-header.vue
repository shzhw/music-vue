<template>
  <div class="m-header">
    <div class="header_lf" @click="showMenu">
      <span class="user_meun"></span>      
    </div>
    <div class="header_rt">
       <router-link to="/login" class="user" tag="div" v-if="!userinfo">
        <i class="icon-mine"></i>
      </router-link>
      <router-link to="/usercontent" class="mine" tag="div" v-else>
        <!-- <i class="avatar" v-if="userinfo.avatar"><img :src="userinfo.avatar" alt=""></i>
        <i class="icon-mine" v-else></i> -->
        <i class="avatar"><img :src="userinfo.avatar" alt=""></i>
        <span class="name">{{userinfo.nickname?userinfo.nickname:userinfo.username}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    showMenu() {
      this.$emit('show-menu');
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.m-header
  height: 44px
  text-align: left
  font-size: 0
  background-color: $color-bakcground-header
  color: $color-text-header
  .header_lf
    float: left
    padding: 14px 15px
    .user_meun
      display: inline-block
      width: 22px
      height: 3px
      border-top: 9px double #fff
      border-bottom: 3px solid #fff
  .header_rt
    float: right
    .user
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-icon-header
    .mine
      overflow: hidden
      .avatar
        float: left
        width: 30px
        height: 30px
        margin: 7px 6px 0
        border-radius: 50%
        overflow: hidden
        img
          width: 100%
          height: 100%
      .icon-mine
        float: left
        padding: 8px
        font-size: 18px
        margin-top: 5px
        color: $color-icon-header
      .name
        float: left
        font-size: 14px
        line-height: 44px
        margin-right: 10px
        max-width: 50px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
