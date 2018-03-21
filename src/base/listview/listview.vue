<template>
  <scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li class="list_group" v-for="(group,index) in data" ref="listGroup" :key="index">
        <h2 class="list_group_title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,subi) in group.list" class="list_group_item" :key="subi">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list_shortcut" @touchstart="onShortcutTouchStart" @touchmove.prevent.stop="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutlist"
            class="item"
            :class="{'active':index===currentIndex}"
            :data-index="index"
            :key="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list_fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed_title">{{fixedTitle}}</h1>
    </div>
    <div class="loading_wrapper" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll';
import { getData } from '@/common/js/dom';
import Loading from '@/base/loading/loading';

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 24;

export default {
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.probeType = 3;
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      heightList: [],
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  },
  computed: {
    shortcutlist() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : '';
    }
  },
  methods: {
    refresh() {
      this.$refs.listview.refresh();
    },
    selectItem(item) {
      this.$emit('select', item);
    },
    onShortcutTouchStart(e) {
      //        console.log(e);
      let anchorIndex = getData(e.target, 'index');
      this.touch.y1 = e.touches[0].pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = this.touch.anchorIndex * 1 + delta;
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _scrollTo(index) {
      // 处理index 的边界情况
      // 点击上下俩片空白
      if (!index && index !== 0) {
        return;
      }
      // move到顶和底
      if (index < 0) {
        index = 0;
      } else if (index > this.heightList.length - 2) {
        index = this.heightList.length - 2;
      }

      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
      this.scrollY = -this.heightList[index];
    },
    _calculateHeight() {
      let list = this.$refs.listGroup;
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        this.heightList.push(height);
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
        //          console.log(this.heightList);
      }, 20);
    },
    scrollY(newY) {
      //        console.log(newY);
      let heightList = this.heightList;
      // 滚动到顶部 newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }

      for (let i = 0; i < heightList.length - 1; i++) {
        let h1 = heightList[i];
        let h2 = heightList[i + 1];
        /* *** 复杂 滚动到开始部分和结束部分有bug *** */
        //          if (!h2 || (-newY > h1 && -newY < h2)) {
        //            this.currentIndex = i;
        //            return;
        //          }
        // 滚动到中间
        if (-newY >= h1 && -newY < h2) {
          this.currentIndex = i;
          this.diff = h2 + newY;
          return;
        }
      }
      // 滚动到底部，且 -newY大于最后一个元素的上限
      this.currentIndex = heightList.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.listview 
  height: 100%
  overflow: hidden
  position: relative
  ul 
    .list_group 
      .list_group_title 
        font-size: 12px
        color: $color-highlight-text
        background-color: $color-highlight-background
        line-height: 24px
        height: 24px
        padding-left: 12px
        border-left: 8px solid $color-theme
      ul 
        padding-bottom: 10px
        .list_group_item 
          color: $color-text-d
          margin-top: 10px
          font-size: 0
          overflow: hidden
          padding: 0 30px
          .avatar 
            width: 40px
            height: 40px
            border-radius: 50%
            float: left
            margin-right: 15px
          .name 
            line-height: 40px
            font-size: 14px
            float: left
  .list_shortcut 
    width: 20px
    padding: 15px 0
    border-radius: 9px
    position: absolute
    right: 0
    top: 50px
    font-size: 14px
    color: $color-highlight-text
    text-align: center
    background-color: $color-background-d
    .item 
      height: 16px
      line-height: 18px
      &.active
        color: $color-theme
        font-weight: bold
  .list_fixed 
    position: absolute
    top: -1px
    left: 0
    width: 100%
    font-size: 12px
    color: $color-highlight-text
    background-color: $color-highlight-background
    line-height: 24px
    height: 24px
    padding-left: 12px
    border-left: 8px solid $color-theme
  .loading_wrapper 
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
