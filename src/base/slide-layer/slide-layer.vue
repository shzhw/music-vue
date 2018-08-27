<template>
  <transition :name="isRight?'slide':'slide-l'">
    <div class="box">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <slot></slot>
      <loading-layer ref="loadingLayer"></loading-layer>
    </div>
  </transition>
</template>

<script>
import LoadingLayer from '@/base/loading-layer/loading-layer';

export default {
  props: {
    direction: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    isRight() {
      return this.direction === 'right';
    },
    flag() {
      return this.isRight ? 1 : -1;
    }
  },
  methods: {
    back() {
      if (this.$refs.loadingLayer.isShow) {
        this.$refs.loadingLayer.hide();
        return;
      }
      this.$router.back();
    },
    requestStart() {
      this.$refs.loadingLayer.show();
    },
    requestEnd() {
      this.$refs.loadingLayer.hide();
    }
  },
  components: {
    LoadingLayer
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'
.box
  position: fixed
  top: 0
  bottom: 0
  z-index: 200
  width: 100%
  background: $color-theme-background
  &.slide-enter-active, &.slide-leave-active, &.slide-l-enter-active, &.slide-l-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  &.slide-l-enter, &.slide-l-leave-to
    transform: translate3d(-100%, 0, 0)
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
</style>
