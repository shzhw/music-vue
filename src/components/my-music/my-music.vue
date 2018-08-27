<template>
  <slide-layer ref="layer">
    <div class="user-center">
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random" v-show="!noResult">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll class="list-scroll" :data="favoriteList" v-if="currentIndex === 0" ref="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll" :data="playHistory" v-if="currentIndex === 1" ref="playList">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </slide-layer>
</template>

<script type="text/ecmascript-6">
import Switches from '@/base/switches/switches';
import Scroll from '@/base/scroll/scroll';
import SongList from '@/base/song-list/song-list';
import NoResult from '@/base/no-result/no-result';
import SlideLayer from '@/base/slide-layer/slide-layer';
import { mapGetters, mapActions } from 'vuex';
import Song from '@/common/js/song';
import { playlistMixin } from '@/common/js/mixin';

export default {
  mixins: [playlistMixin],
  data() {
    return {
      switches: [{ name: '我喜欢的' }, { name: '最近听的' }],
      currentIndex: 0
    };
  },
  computed: {
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length;
      } else {
        return !this.playHistory.length;
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲';
      } else {
        return '您还没有听过歌曲';
      }
    },
    ...mapGetters(['favoriteList', 'playHistory'])
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : '';
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.favoriteList && this.$refs.favoriteList.refresh();
      this.$refs.playList && this.$refs.playList.refresh();
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(song, index) {
      if (this.playHistory[0].id !== song.id) {
        this.insertSong(new Song(song));
      }
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      if (list.length < 1) return;
      list = list.map(item => {
        return new Song(item);
      });
      this.randomPlay({ list });
    },
    ...mapActions(['insertSong', 'randomPlay'])
  },
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult,
    SlideLayer
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.user-center
  .switches-wrapper
    margin: 10px 0 30px 0
    position: relative
  .play-btn
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid $color-text-l
    color: $color-text-l
    border-radius: 100px
    font-size: 0
    .icon-play
      display: inline-block
      vertical-align: middle
      margin-right: 6px
      font-size: $font-size-medium-x
    .text
      display: inline-block
      vertical-align: middle
      font-size: $font-size-small
  .list-wrapper
    position: absolute
    top: 110px
    bottom: 0
    width: 100%
    .list-scroll
      height: 100%
      overflow: hidden
      .list-inner
        padding: 20px 30px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
