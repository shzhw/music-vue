<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list" @update="update"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from '@/api/singer';
  import {ERR_OK} from '@/api/config';
  import Singer from '@/common/js/singer';
  import ListView from '@/base/listview/listview';
  import {mapMutations} from 'vuex';
  import {playlistMixin} from '@/common/js/mixin';

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;

  export default {
    mixins: [playlistMixin],
    created() {
      this._getSingerList();
    },
    data() {
      return {
        singers: []
      };
    },
    methods: {
      update() {
        this._getSingerList();
      },
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : '';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh();
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer);
      },
      _getSingerList() {
        getSingerList().then((res) => {
          // console.log(res);
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list);
            // console.log(this.singers);
          }
        }).catch(e => {});
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            list: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.list.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }

          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              list: []
            };
          }
          map[key].list.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        });
        // 为了得到有序列表，需要处理map
        let hot = [];
        let ret = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]{1}/)) {
            ret.push(val);
          } else if (val.title === HOT_NAME) {
            hot.push(val);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return hot.concat(ret);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable.styl'
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
