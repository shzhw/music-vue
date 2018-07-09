<template>
  <div class="loading_bg" @click="clickHandler">
    <div class="loading_wrapper">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading';

export default {
  methods: {
    clickHandler() {
      this.$emit('update');
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped lang="stylus">
.loading_bg
  width: 100%
  height: 100%
  .loading_wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
