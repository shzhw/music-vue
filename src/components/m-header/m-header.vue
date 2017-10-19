<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default {

  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

  .m-header
    height: 44px
    text-align: center
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      width: 30px
      height: 32px
      margin: 6px 9px 0 0
      -webkit-background-size: 30px 32px
      background-size: 30px 32px
      bg-image("logo")
    .text
      display: inline-block
      line-height: 44px
      font-size:$font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
