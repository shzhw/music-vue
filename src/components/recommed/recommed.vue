<template>
  <div class="recommed">
    <div class="slider_wrapper">
      <slider>
        <div v-for="item in slider">
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
  import {getRecommend} from '@/api/recommend';
  import {ERR_OK} from '@/api/config';
  import Slider from '@/base/slider/slider';

  export default {
    created() {
      this._getRecommend();
    },
    data() {
      return {
        slider: []
      };
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.slider = res.data.slider;
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
      width: 100%
    .recommed_list
      .list_title
        text-align: center;
        color: $color-theme
</style>
