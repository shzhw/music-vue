<template>
  <div class="singer">

  </div>
</template>

<script>
  import {getSingerList} from '@/api/singer.js';
  import {ERR_OK} from '@/api/config.js';
  import Singer from '@/common/js/singer.js';

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;

  export default {
    created() {
      this._getSingerList();
    },
    data() {
      return {
        singers: []
      };
    },
    methods: {
      _getSingerList: function() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            console.log(this._normalizeSinger(this.singers));
          }
        });
      },
      _normalizeSinger: function(list) {
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
              items: []
            };
          }
          map[key].items.push(new Singer({
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
      }
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
