<template>
  <div class="slider" ref="slider">
    <div class="slider_group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {addClass} from '@/common/js/dom';

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPaly: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4
      }
    },
    mounted() {
      setTimeout(() => {

      }, 20);
    },
    data() {
      return {};
    },
    motheds: {
      _setSliderWidth: function () {
        this.children = this.$refs.sliderGroup.children;

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(childl,"slider_item");

          child.style.width = sliderWidth;
          width += sliderWidth;
        }

      },
      _initSlider: function () {

      }

    }

  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  .slider
    .slider_group
      position: relative
      overflow: hidden
      white-space:nowrap
      .slider-item
        float:left
        box-sizing:border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 0
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        background:$color-text-l
        &.active
          width: 20px
          -webkit-border-radius: 5px
          -moz-border-radius: 5px
          border-radius: 5px
          background: $color-text-ll
</style>
