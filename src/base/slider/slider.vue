<template>
  <div class="slider" ref="slider">
    <div class="slider_group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currPageIndex===index}" v-for="(dot,index) in dots" :key="index"></span>
    </div>
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
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currPageIndex: 0
      };
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        // 顺序
        this._initSlider();// Ⅰ better-scroll 做无缝轮播时会自动多克隆俩个dom
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      }, 20);
    },
    methods: {
      _setSliderWidth: function() {
        this.children = this.$refs.sliderGroup.children;

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider_item');

          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        if (this.loop) {
          width += sliderWidth * 2;// ?  -》Ⅰ
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots: function() {
        this.dots = new Array(this.children.length);
      },
      _initSlider: function() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex--; // ?
          }
          this.currPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play();
          }
        });
      },
      _play: function() {
        let pageIndex = this.currPageIndex + 1;
        if (this.loop) {
          pageIndex++;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  .slider
    min-height: 1px
    .slider_group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider_item
        float: left
        box-sizing: border-box
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
      bottom: 12px
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
        background: $color-text-l
        &.active
          width: 20px
          -webkit-border-radius: 5px
          -moz-border-radius: 5px
          border-radius: 5px
          background: $color-text-ll
</style>
