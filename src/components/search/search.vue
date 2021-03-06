<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" :data="shortcut" ref="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h2 class="title">热门搜索</h2>
            <ul>
              <li class="item" v-for="(item,index) in hotKey" @click="addQuery(item.k)" :key="index">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest @listScroll="blurInput" @select="saveSearch" :query="query" ref="suggest"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史" @confirm="confirm"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box';
  import Suggest from '@/components/suggest/suggest';
  import SearchList from '@/base/search-list/search-list';
  import Scroll from '@/base/scroll/scroll';
  import Confirm from '@/base/confirm/confirm';
  import {getHotKey} from '@/api/search';
  import {ERR_OK} from '@/api/config';
  import {mapActions} from 'vuex';
  import {playlistMixin, searchMixin} from '@/common/js/mixin';

  export default {
    mixins: [playlistMixin, searchMixin],
    created() {
      this._getHotKey();
    },
    data() {
      return {
        hotKey: []
      };
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory);
      }
    },
    methods: {
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : '';
        this.$refs.shortcutWrapper.style.bottom = bottom;
        this.$refs.shortcut.refresh();
        this.$refs.searchResult.style.bottom = bottom;
        this.$refs.suggest.refresh();
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      confirm() {
        this.clearSearchHistory();
      },
      _getHotKey() {
        getHotKey()
          .then((res) => {
            if (res.code === ERR_OK) {
//              console.log(res.data);
              this.hotKey = res.data.hotkey.slice(0, 10);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh();
          }, 20);
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    }
  };
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 8px 15px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
            &:first-child
              color: $color-theme
              font-weight: bold
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
