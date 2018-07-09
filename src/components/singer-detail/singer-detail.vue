<template>
  <transition name="slider">
    <music-list :bgImg="bgImg" :title="title" :songs="songs" @update="update"></music-list>
  </transition>
</template>

<script>
  import MusicList from '@/components/music-list/music-list';
  import {getSingerDetail} from '@/api/singer';
  import {ERR_OK} from '@/api/config';
  import {mapGetters} from 'vuex';
  import {createSong} from '@/common/js/song';

  export default {
    data() {
      return {
        songs: []
      };
    },
    computed: {
      title() {
        return this.singer.name;
      },
      bgImg() {
        return this.singer.avatar;
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail();
      // console.log(this.singer);
    },
    methods: {
      update() {
        this._getDetail();
      },
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return;
        }
        getSingerDetail(this.singer.id)
          .then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res.data.list);
              this.songs = this._normalizeSongs(res.data.list);
            }
          }).catch((e) => {});
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    components: {
      MusicList
    }
  };
</script>

<style scoped lang="stylus">
  .slider-enter-active, .slider-leave-active
    transition: all .3s

  .slider-enter, .slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
