<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    <alert :alert="alert"></alert>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
import Alert from '@/base/alert/alert';
import Users from '@/api/Users';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['alert'])
  },
  mounted() {
    let userinfo = Users.getUserinfo();
    this.setInfo(userinfo);
  },
  methods: {
    ...mapActions({
      setInfo: 'setUserInfo'
    })
  },
  components: {
    MHeader,
    Tab,
    Player,
    Alert
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable.styl'
</style>
