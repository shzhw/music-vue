<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs="songs" :rank="true" @update="update"></music-list>
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list';
import { mapGetters } from 'vuex';
import { getMusicList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/common/js/song';

export default {
  created() {
    this._getMusicList();
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.topList.topTitle;
    },
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return this.topList.picUrl;
    },
    ...mapGetters(['topList'])
  },
  methods: {
    update() {
      this._getMusicList();
    },
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank');
        return;
      }
      getMusicList(this.topList.id)
        .then(res => {
          if (res.code === ERR_OK) {
            //              console.log(res.songlist);
            this.songs = this._normalizeSongs(res.songlist);
            // console.log(this.songs);
          }
        })
        .catch(() => {});
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item.data;
        if (musicData.songid && musicData.albumid) {
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
  transition: all 0.3s
.slider-enter, .slider-leave-to
  transform: translate3d(100%, 0, 0)
</style>
