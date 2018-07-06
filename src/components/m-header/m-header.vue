<template>
  <div class="m-header">
    <h1 class="text">Music</h1>
    <router-link to="/login" class="user" tag="div" v-if="!userinfo">
      <i class="icon-mine"></i>
    </router-link>
    <router-link to="/userinfo" class="mine" tag="div" v-else>
      <i class="avatar" v-if="userinfo.avatar"><img :src="userinfo.avatar" alt=""></i>
      <i class="icon-mine" v-else></i>
      <span class="name">{{userinfo.nickname?userinfo.nickname:userinfo.username}}</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  mounted() {},
  watch: {
    userinfo(newval) {
      console.log(newval);
    }
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
  padding-left: 15px
  .text
    display: inline-block
    line-height: 44px
    font-size: $font-size-large
  .user
    position: absolute
    top: 0
    right: 0
    .icon-mine
      display: block
      padding: 12px
      font-size: 20px
      color: $color-icon-header
  .mine
    position: absolute
    top: 0
    right: 0
    .avatar
      float: left
      width: 30px
      height: 30px
      margin: 7px 0 0
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
