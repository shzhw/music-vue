<template>
  <slide-layer>
    <div class="register_box">
      <ul class="register_inner">
        <li>
          <input type="text" placeholder="请输入用户名">
        </li>
        <li>
          <input type="text" placeholder="密码">
        </li>
        <li>
          <input type="text" placeholder="确认密码">
        </li>
        <li class="not_cm_li">
            <input type="checkbox" class="agreement_ck" id="agreement_ck">
            <label class="agreement" for="agreement_ck">阅读并接受<a href="javascript:;">《用户协议》</a>及<a href="javascript:;">《隐私权保护声明》</a></label>
        </li>
        <li>
          <router-link class="register_btn" tag="button" to="/api/register_post">提交</router-link>
        </li>
      </ul>
    </div>
  </slide-layer>
</template>

<script>
import SlideLayer from '@/base/slide-layer/slide-layer';

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  components: {
    SlideLayer
  }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .register_box
    width 100%
    height 100%
    bg-image('login_bg')
    bakcground-repeat: no-repeat
    background-size: 100%
    .register_inner
       width 80%
       height 300px
       position absolute
       top 50%
       left 50%
       transform: translate(-50%,-50%)
       >li
        width: 100%
        margin-bottom: 15px
        &:not(.not_cm_li)
          >input
            display: block
            width 100%
            line-height: 35px
            height 35px
            padding:0 10px
            box-sizing:border-box
            border: none
          .text_box
            line-height: 30px
            color: $color-theme
            font-style: italic
            font-size: 14px
            margin-bottom: 10px
        .agreement
          font-size: 12px
          a
            color: $color-theme
        .register_btn
          margin-top: 30px
          width: 100%
          height: 100%
          line-height: 35px
          text-align: center
          border: none
          border-radius: 5px
          font-weight: bold
          letter-spacing: 7px
          color: #fff
          background-color: $color-theme
</style>
