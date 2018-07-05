<template>
  <transition name="alert-fade">
    <div class="alert_bg" v-if="alert.isShow" @click="hide">
      <div class="alert_wrap">
        <div class="alert_content">
          <p class="text">{{alert.text}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    alert: Object
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    hide() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let cbk = this.alert.hidecbk;
      this.setAlert({
        text: '',
        isShow: false
      });
      if (cbk) cbk();
    },
    ...mapMutations({
      setAlert: 'SET_ALERT'
    })
  },
  watch: {
    'alert.isShow'(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.hide();
        }, 2500);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'

.alert_bg
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color: $color-background-d
  z-index: 999
  &.alert-fade-enter-active
    animation: alert-fadein 0.3s
    .alert_content
      animation: alert-zoom 0.3s
  .alert_wrap
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border-radius: 13px
    background: $color-highlight-background
    .alert_content
      width: 270px
      font-size: 20px
      text-align: center
      .text
        padding: 19px 15px
        line-height: 22px
        text-align: center
        font-size: $font-size-large
        color: $color-text-l
@keyframes alert-fadein
  0%
    opacity: 0
  100%
    opacity: 1
@keyframes alert-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
