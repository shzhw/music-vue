<template>
  <div class="loading_bg" @click="clickHandler" v-show="showFlag">
    <div class="loading_wrapper">
      <loading v-if="network"></loading>
      <div class="out" v-else>
        <i class="icon-perm_scan_wifi icon"></i>
        <span class="text">请检查网络连接</span>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading';

export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      network: true,
      timer: null
    };
  },
  mounted() {
    if (this.showFlag) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.network = false;
      }, 3000);
    }
  },
  methods: {
    clickHandler() {
      if (!this.network) this.$emit('update');
    }
  },
  watch: {
    showFlag(newVal) {
      if (newVal) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.network = false;
        }, 3000);
      }
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.loading_bg
  width: 100%
  height: 100%
  .loading_wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
    .out
      text-align: center
      color: $color-text-d
      .icon
        display: block
        font-size: 60px
        margin-bottom: 10px
</style>
