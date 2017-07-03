<template>
  <div class="recommed">
    <div class="slider_wrapper"></div>
    <div class="recommed_list">
      <h2 class="list_title">热门歌单推荐</h2>
      <ul></ul>
    </div>
  </div>
</template>

<script>
  import getRecommend from '@/api/recommend.js';

  export default {
    created() {

    },
    methods: {
      _getRecommend() {
        getRecommend();
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  .recommed
    .slider_wrapper
      width: 100%
      height: 150px
    .recommed_list
      .list_title
        text-align: center;
        color: $color-theme
</style>
