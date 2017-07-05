<template>
  <div class="recommed">
    <div v-if="sliderData.length" class="slider_wrapper">
      <slider>
        <div v-for="item in sliderData">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </slider>
    </div>
    <div class="recommed_list">
      <h2 class="list_title">热门歌单推荐</h2>
      <ul></ul>
    </div>
  </div>
</template>

<script>
  import {getRecommend, getDiscList} from '@/api/recommend';
  import {ERR_OK} from '@/api/config';
  import Slider from '@/base/slider/slider';

  export default {
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    destory() {
      clearTimeout(this.timer);
    },
    data() {
      return {
        sliderData: []
      };
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.sliderData = res.data.slider;
          }
        });
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res);
          }
        });
      }
    },
    components: {
      Slider
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  .recommed
    .slider_wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommed_list
      .list_title
        height: 65px
        line-height: 65px
        font-size: $font-size-medium
        text-align: center;
        color: $color-theme
</style>
