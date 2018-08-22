<template>
  <div class="tab">
    <a class="tab-item" :class="{active:curIndex ===index}" v-for="(item,index) in tabs" :key="index" @click="clickHandler(index)">
      <span class="tab-link">{{item}}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    curIndex: Number
  },
  model: {
    prop: 'curIndex',
    event: 'change'
  },
  data() {
    return {
      tabs: ['推荐', '歌手', '排行', '搜索']
    };
  },
  methods: {
    clickHandler(index) {
      if (index !== this.curIndex) {
        this.$emit('change', index);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.tab
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      padding-bottom: 5px
      color: $color-text-l
    &.active
      .tab-link
        color: $color-theme
        border-bottom: 2px solid $color-theme
        font-weight: bold
</style>
