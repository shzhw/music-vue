import Vue from 'vue';
import Router from 'vue-router';
const Recommed = (resolve) => {
  import('@/components/recommed/recommed').then((recommed) => {
    resolve(recommed);
  });
};

const Singer = (resolve) => {
  import('@/components/singer/singer').then((singer) => {
    resolve(singer);
  });
};
const Rank = (resolve) => {
  import('@/components/rank/rank').then((rank) => {
    resolve(rank);
  });
};
const Search = (resolve) => {
  import('@/components/search/search').then((search) => {
    resolve(search);
  });
};
const SingerDetail = (resolve) => {
  import('@/components/singer-detail/singer-detail').then((singerDetail) => {
    resolve(singerDetail);
  });
};
const Disc = (resolve) => {
  import('@/components/disc/disc').then((disc) => {
    resolve(disc);
  });
};
const TopList = (resolve) => {
  import('@/components/disc/disc').then((toplist) => {
    resolve(toplist);
  });
};
const UserContent = (resolve) => {
  import('@/components/user-content/user-content').then((userContent) => {
    resolve(userContent);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommed,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserContent
    }
  ],
  linkActiveClass: 'active'
});
