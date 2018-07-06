<template>
  <div class="loading-layer" v-if="isShow">
    <loading :title="title" class="loading_big"></loading>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading';

export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl';
  .loading-layer
    position: absolute 
    top: 42px
    right: 0
    bottom 0
    left 0
    background-color: $color-background-d
    .loading_big
      transform: scale(1.5)
</style>
