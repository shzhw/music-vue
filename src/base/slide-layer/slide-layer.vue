<template>
  <transition name="slide">
    <div class="box">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  components: {
  }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
    
  .box
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-theme-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
</style>
