<template>
  <div class="loading">
    <img src="./loading.gif" alt="" :width="width" :height="height">
    <p class="desc" ref="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      width: 24,
      height: 24
    };
  },
  mounted() {
    if (this.size === 'large') {
      this.width = this.height = 45;
      this.$refs.desc.style.fontSize = '18px';
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.loading
  width: 100%
  text-align: center
  .desc
    margin-top: 5px
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
