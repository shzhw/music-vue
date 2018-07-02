<template>
   <slide-layer>
    <div class="login_box">
      <router-link class="register_btn" tag="a" to="/register">注册</router-link>
      <form action="/api/login_post" @submit.prevent="login">
        <ul class="login_inner">
          <li class="username">
            <input type="text" placeholder="请输入用户名" autocomplete="off">
            <div class="text_box">
              <span class="text">用户名密码不正确</span>
            </div>
          <li class="password">
            <input type="password" class="pswd" placeholder="请输入密码" autocomplete="off">
          </li>
          <li class="login_btn_box">
            <button type="submit" class="login_btn">登陆</button>
          </li>       
        </ul>
      </form>
    </div>
  </slide-layer>
</template>

<script type="text/ecmascript-6">
  import SlideLayer from '@/base/slide-layer/slide-layer';

  export default {
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
      login() {
        alert('未开放');
      }
    },
    components: {
      SlideLayer
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .login_box
    width 100%
    height 100%
    bg-image('login_bg')
    bakcground-repeat: no-repeat
    background-size: 100%
    .register_btn
      color: $color-theme
      position absolute
      right: 20px
      top: 0
      height: 42px
      line-height: 42px
    .login_inner
       width 80%
       height 300px
       position absolute
       top 50%
       left 50%
       transform: translate(-50%,-50%)
       >li
        width 100%
        input
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
        .login_btn
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
