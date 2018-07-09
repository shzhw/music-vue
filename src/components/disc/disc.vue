<template>
  <transition name="slider">
    <music-list :bgImg="bgImg" :title="title" :songs="songs" @update="update"></music-list>
  </transition>
</template>

<script>
  import MusicList from '@/components/music-list/music-list';
  import {mapGetters} from 'vuex';
  import {getSongList} from '@/api/recommend';
  import {ERR_OK} from '@/api/config';
  import {createSong} from '@/common/js/song';

  export default {
    created() {
      this._getSongList();
    },
    data() {
      return {
        songs: []
      };
    },
    computed: {
      title() {
        return this.disc.dissname;
      },
      bgImg() {
        return this.disc.imgurl;
      },
      ...mapGetters([
        'disc'
      ])
    },
    methods: {
      update() {
        this._getSongList();
      },
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend');
        }
        getSongList(this.disc.dissid)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.songs = this._normalizeSong(res.cdlist[0].songlist);
            }
          })
          .catch(() => {
          });
      },
      _normalizeSong(list) {
        let _list = [];
        // console.log(list);
        list.forEach((item) => {
          if (item.songid && item.songmid) {
            _list.push(createSong(item));
          }
        });
        return _list;
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
