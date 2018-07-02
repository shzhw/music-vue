<template>
  <slide-layer>
    <div class="register_box">
      <form action="/api/register_post" @submit.prevent="register">
        <ul class="register_inner">
          <li class="input_box">
            <input type="text" placeholder="请输入用户名" autocomplete="off">
          </li>
          <li class="input_box">
            <input type="text" placeholder="密码" autocomplete="off">
          </li>
          <li class="input_box">
            <input type="text" placeholder="确认密码" autocomplete="off">
          </li>
          <li class="not_cm_li v_code_box">
            <input type="text">
            <div class="v_code_img"></div>
          </li>
          <li class="agreement_box">
              <input type="checkbox" class="agreement_ck" id="agreement_ck">
              <label class="agreement" for="agreement_ck">阅读并接受<a href="javascript:;">《用户协议》</a>及<a href="javascript:;">《隐私权保护声明》</a></label>
          </li>
          <li>
            <button class="register_btn" type="submit">提交</button>
          </li>
        </ul>
      </form>
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
    register() {
      alert('未开放');
    }
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
        >input
          line-height: 35px
          height 35px
          padding:0 10px
          box-sizing:border-box
          border: none
        &.input_box
          >input
            display: block
            width 100%
          .text_box
            line-height: 30px
            color: $color-theme
            font-style: italic
            font-size: 14px
            margin-bottom: 10px
        &.v_code_box
          display: flex
          input
            flex: 0 0 150px
            width: 150px
          .v_code_img
            flex: 1
            margin-left: 30px
            background-color: #ccc
        &.agreement_box
          display: flex
          height: 18px
          line-height 18px
          input
            flex: 0 0 15px
            height: 100%
          .agreement
            flex: 1    
        .agreement
          font-size: 12px
          a
            color: $color-theme
        .register_btn
          margin-top: 12px
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
