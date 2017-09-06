<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list"
            ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="loading_wrapper" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import SongList from '@/base/song-list/song-list';
  import Loading from '@/base/loading/loading';
  import {prefixStyle} from '@/common/js/dom';
  import {mapActions} from 'vuex';

  const RESERVED_HEIGHT = 40;
  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('backdrop-filter');

  export default {
    props: {
      bgImg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        scorllY: 0
      };
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImg})`;
      }
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
    },
    mounted() {
      this.bgImgHeight = this.$refs.bgImg.clientHeight;
      this.minTranslateY = -1 * this.bgImgHeight + RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${this.bgImgHeight}px`;
    },
    watch: {
      scorllY(newY) {
        let translateY = Math.max(this.minTranslateY, newY);
        this.$refs.bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`;
        let zIndex = 0;
        let scale = 1;
        let blur = 0;
        // 向下拉 图片放大
        const percent = Math.abs(newY / this.minTranslateY); // 计算图片应该放大的比例 保证无缝贴合
        if (newY > 0) {
          zIndex = 10;
          scale = 1 + percent;
        } else {
          blur = Math.min(20 * percent, 20);
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
        // 向上
        if (newY < this.minTranslateY) {
          zIndex = 10;
          this.$refs.bgImg.style.paddingTop = 0;
          this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`;
          this.$refs.playBtn.style.display = 'none';
        } else {
          this.$refs.bgImg.style.paddingTop = '70%';
          this.$refs.bgImg.style.height = 0;
          this.$refs.playBtn.style.display = '';
        }
        this.$refs.bgImg.style.zIndex = zIndex;
        this.$refs.bgImg.style[transform] = `scale(${scale})`;
      }
    },
    methods: {
      scroll(pos) {
        this.scorllY = pos.y;
      },
      back() {
        this.$router.back();
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        });
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
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
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      /*background: $color-background*/
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
