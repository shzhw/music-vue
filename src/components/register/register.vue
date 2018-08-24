<template>
  <slide-layer ref="slideLayer">
    <div class="register_box">
      <scroll class="scroll_box">
        <form action="/api/register_post" @submit.prevent="register" class="scroll_cnt">
          <ul class="register_inner">
            <li class="input_box">
              <input type="text" placeholder="昵称" autocomplete="off" v-model="v_nickname">
              <span class="text_box" v-if="nickname.message">{{nickname.message}}</span>
            </li>
            <li class="input_box">
              <input type="text" placeholder="请输入用户名" autocomplete="off" v-model="v_username">
              <span class="text_box" v-if="username.message">{{username.message}}</span>
            </li>
            <li class="input_box">
              <input type="password" placeholder="密码" autocomplete="off" v-model="v_pwd">
              <span class="text_box" v-if="pwd.message">{{pwd.message}}</span>
            </li>
            <li class="input_box">
              <input type="password" placeholder="确认密码" autocomplete="off" v-model="v_rppwd">
              <span class="text_box" v-if="rppwd.message">{{rppwd.message}}</span>
            </li>
            <li class="not_cm_li v_code_box">
              <div class="wrap">
                <input type="text" v-model="v_ucode">
                <!-- <div class="v_code_img">abcd</div> -->
                <canvas class="v_code_img" ref="myCanvas" width="70px" height="35px" @click="createCode"></canvas>
              </div>
              <span class="text_box" v-if="ucode.message">{{ucode.message}}</span>
            </li>
            <li class="agreement_box">
                <input type="checkbox" class="agreement_ck" id="agreement_ck" checked>
                <label class="agreement" for="agreement_ck">阅读并接受<a href="javascript:;">《用户协议》</a>及<a href="javascript:;">《隐私权保护声明》</a></label>
            </li>
            <li>
              <button class="register_btn" type="submit" :disabled="!valid">提交</button>
            </li>
          </ul>
        </form>
      </scroll>
    </div>
  </slide-layer>
</template>

<script>
import SlideLayer from '@/base/slide-layer/slide-layer';
import Scroll from '@/base/scroll/scroll';
import Users from '@/api/Users';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      nickname: {},
      username: {},
      pwd: {},
      rppwd: {},
      ucode: {},
      code: ''
    };
  },
  computed: {
    v_nickname: {
      set(value) {
        let message = '';
        if (value.length > 6) {
          message = '昵称不能超过6位';
        }
        this.nickname = {
          value,
          message,
          valid: message === ''
        };
      },
      get() {
        return this.nickname.value;
      }
    },
    v_username: {
      set(value) {
        let message = '';
        if (value.length < 4) {
          message = '用户名为长度必须大于等于4';
        }
        this.username = {
          value,
          message,
          valid: message === ''
        };
      },
      get() {
        return this.username.value;
      }
    },
    v_pwd: {
      set(value) {
        let message = '';
        let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
        if (value.length < 6 || value.length > 16) {
          message = '6-16位字符，区分大小写';
        } else if (!reg.test(value)) {
          message = '由大小写字母、数字、特俗符号任意俩种组合';
        }
        if (value !== this.rppwd.value) {
          this.rppwd.message = '俩次密码不一样';
        }
        this.pwd = {
          value,
          message,
          valid: message === ''
        };
      },
      get() {
        return this.pwd.value;
      }
    },
    v_rppwd: {
      set(value) {
        let message = '';
        if (value !== this.pwd.value) {
          message = '俩次密码不一样';
        }
        this.rppwd = {
          value,
          message,
          valid: message === ''
        };
      },
      get() {
        return this.rppwd.value;
      }
    },
    v_ucode: {
      set(value) {
        let message = '';
        if (value.toLocaleUpperCase() !== this.code.toLocaleUpperCase()) {
          message = '验证码不正确';
        }
        this.ucode = {
          value,
          message,
          valid: message === ''
        };
      },
      get() {
        return this.ucode.value;
      }
    },
    valid() {
      return (
        this.nickname.valid &&
        this.username.valid &&
        this.pwd.valid &&
        this.rppwd.valid &&
        this.ucode.valid
      );
    }
  },
  mounted() {
    this.createCode();
  },
  methods: {
    createCode() {
      this.code = '';
      let codeLength = 4; // 验证码的长度，可变
      let canvas = this.$refs.myCanvas; // 获取画布
      let selectChar = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]; // 所有候选组成验证码的字符

      for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36);
        this.code += selectChar[charIndex];
      }
      if (canvas) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 70, 35);
        ctx.font = '25px arial';
        // 创建渐变
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        // 用渐变填色
        ctx.strokeStyle = gradient;
        ctx.strokeText(this.code, 3, 26); // 画布上添加验证码
      }
    },
    register() {
      this.$refs.slideLayer.requestStart();
      Users.add({
        username: this.username.value,
        password: this.pwd.value,
        nickname: this.nickname.value
      })
        .then(res => {
          if (res.objectId) {
            // 成功
            this.alert({
              text: '注册成功',
              isShow: true,
              hidecbk: () => {
                // 登陆
                Users.login({
                  username: this.username.value,
                  password: this.pwd.value
                })
                  .then(() => {
                    this.setInfo(Users.getUserinfo());
                    this.$router.push('/');
                  })
                  .catch(() => {});
              }
            });
          }
          this.$refs.slideLayer.requestEnd();
        })
        .catch(err => {
          if (err.code === 202) {
            this.alert({
              text: '用户名已经存在',
              isShow: true
            });
            this.username.message = '用户名已经存在';
          }
          this.pwd = {};
          this.rppwd = {};
          this.ucode = {};
          this.createCode();
          this.$refs.slideLayer.requestEnd();
        });
    },
    ...mapMutations({
      alert: 'SET_ALERT',
      setInfo: 'SET_USERINFO'
    })
  },
  components: {
    SlideLayer,
    Scroll
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'
@import '../../common/stylus/mixin'

.register_box
  width: 100%
  height: 100%
  bg-image('login_bg')
  background-repeat: no-repeat
  background-size: 100%
  background-color: #320808
  &:before
    content: ''
    display: table
  .scroll_box
    margin-top: 42px
    overflow: hidden
    height: 100%
    .scroll_cnt
      position: relative
      min-height: 450px
      height: 100%
      .register_inner
        width: 80%
        position: absolute
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
        >li
          width: 100%
          margin-bottom: 30px
          >input
            line-height: 35px
            height: 35px
            padding: 0 10px
            box-sizing: border-box
            border: none
          &.input_box
            >input
              display: block
              width: 100%
          .text_box
            float: left
            line-height: 30px
            color: $color-theme
            font-style: italic
            font-size: 14px
          &.v_code_box
            .wrap
              display: flex
              input
                flex: 0 0 150px
                width: 150px
                text-align: center
                font-size: 18px
              .v_code_img
                flex: 1
                margin-left: 30px
                background-color: #ccc
          &.agreement_box
            display: flex
            height: 18px
            line-height: 18px
            margin-bottom: 0
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
            &:disabled
              background-color: #aaa
</style>
