<template>
   <slide-layer ref="slideLayer">
    <div class="login_box">
      <router-link class="register_btn" tag="a" to="/register">注册</router-link>
      <scroll class="scroll_box">
        <form action="/api/login_post" @submit.prevent="login" class="scroll_cnt">
          <ul class="login_inner">
            <li class="username">
              <input type="text" placeholder="请输入用户名" autocomplete="off" v-model="username">
              <div class="text_box">
                <span class="text" v-if="errorMessage">{{errorMessage.text}}</span>
              </div>
            <li class="password">
              <input type="password" class="pswd" placeholder="请输入密码" autocomplete="off" v-model="userpwd">
            </li>
            <li class="login_btn_box">
              <button type="submit" class="login_btn">登录</button>
            </li>       
          </ul>
        </form>
      </scroll>
    </div>
  </slide-layer>
</template>

<script type="text/ecmascript-6">
import SlideLayer from '@/base/slide-layer/slide-layer';
import Scroll from '@/base/scroll/scroll';
import Users from '@/api/Users';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      username: '',
      userpwd: '',
      errorMessage: null
    };
  },
  computed: {},
  methods: {
    login() {
      this.$refs.slideLayer.requestStart();
      if (this.username.trim() === '' || this.userpwd.trim() === '') {
        this.errorMessage = {
          text: '用户名密码不能为空',
          code: 1
        };
      }
      Users.login({
        username: this.username,
        password: this.userpwd
      })
        .then(() => {
          this.setInfo(Users.getUserinfo());
          this.$refs.slideLayer.requestEnd();
          this.$router.push('/');
        })
        .catch(err => {
          if (err) {
            this.alert({
              text: '登陆失败',
              isShow: false
            });
          }
          this.userpwd = '';
          this.errorMessage = {
            text: '用户名或密码不正确',
            code: 2
          };
          this.$refs.slideLayer.requestEnd();
        });
    },
    ...mapMutations({
      setInfo: 'SET_USERINFO',
      alert: 'SET_ALERT'
    })
  },
  components: {
    SlideLayer,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
@import '../../common/stylus/mixin'

.login_box
  width: 100%
  height: 100%
  bg-image('login_bg')
  background-repeat: no-repeat
  background-size: 100%
  background-color: #320808
  &:before
    content: ''
    display: table
  .register_btn
    color: $color-theme
    position: absolute
    right: 20px
    top: 0
    height: 42px
    line-height: 42px
  .scroll_box
    margin-top: 42px
    overflow: hidden
    height: 100%
    .scroll_cnt
      position: relative
      min-height: 200px
      height: 100%
      .login_inner
        width: 80%
        position: absolute
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
        >li
          width: 100%
          input
            display: block
            width: 100%
            line-height: 35px
            height: 35px
            padding: 0 10px
            box-sizing: border-box
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
