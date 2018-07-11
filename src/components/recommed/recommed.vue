<template>
  <div class="recommed" ref="recommed">
    <div v-if="sliderData.length" class="slider_wrapper">
      <swiper :options="swiperOption" ref="swiper">
        <!-- slides -->
        <swiper-slide v-for="(item,i) in sliderData" :key="i">
          <a :href="item.linkUrl" style="display:block;width:100%">
            <img @load="imgOnload" :src="item.picUrl" alt="" style="width:100%">
          </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <scroll ref="scroll" class="recommed_content" :data="discList">
      <div>
        <div class="recommed_list">
          <h2 class="list_title">热门歌单推荐</h2>
          <ul>
            <li class="item" v-for="(item,index) in discList" @click="selectItem(item)" :key="index">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading-up :show-flag="!discList.length" @update="update"></loading-up>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Scroll from '@/base/scroll/scroll';
import LoadingUp from '@/base/loading-up/loading-up';
import { playlistMixin } from '@/common/js/mixin';
import { mapMutations } from 'vuex';

export default {
  mixins: [playlistMixin],
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  destory() {
    clearTimeout(this.timer);
  },
  data() {
    return {
      sliderData: [],
      discList: [],
      checkLoaded: true,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    };
  },
  methods: {
    update() {
      this._getRecommend();
      this._getDiscList();
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : '';
      this.$refs.recommed.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    _getRecommend() {
      getRecommend()
        .then(res => {
          if (res.code === ERR_OK) {
            this.sliderData = res.data.slider;
          }
        })
        .catch(e => {});
    },
    _getDiscList() {
      getDiscList()
        .then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
          }
        })
        .catch(e => {});
    },
    imgOnload() {
      if (this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = false;
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    swiper,
    swiperSlide,
    Scroll,
    LoadingUp
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl'

.recommed
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
  .recommed_content
    height: 100%
    overflow: hidden
    .slider_wrapper
      width: 100%
    .recommed_list
      .list_title
        height: 65px
        line-height: 65px
        font-size: $font-size-medium
        text-align: center
        color: $color-theme
        font-weight: bold
      ul
        padding: 0 15px
        .item
          display: flex
          padding: 0 20px 20px 20px
          align-items: center
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>
