import Vue from 'vue';
import Router from 'vue-router';

// import Users from '@/api/Users';

const Recommed = resolve => {
  import('@/components/recommed/recommed').then(recommed => {
    resolve(recommed);
  });
};

const Singer = resolve => {
  import('@/components/singer/singer').then(singer => {
    resolve(singer);
  });
};
const Rank = resolve => {
  import('@/components/rank/rank').then(rank => {
    resolve(rank);
  });
};
const Search = resolve => {
  import('@/components/search/search').then(search => {
    resolve(search);
  });
};
const SingerDetail = resolve => {
  import('@/components/singer-detail/singer-detail').then(singerDetail => {
    resolve(singerDetail);
  });
};
const Disc = resolve => {
  import('@/components/disc/disc').then(disc => {
    resolve(disc);
  });
};
const TopList = resolve => {
  import('@/components/top-list/top-list').then(toplist => {
    resolve(toplist);
  });
};
const MyMusic = resolve => {
  import('@/components/my-music/my-music').then(myMusic => {
    resolve(myMusic);
  });
};

const UserContent = resolve => {
  import('@/components/user-content/user-content').then(userContent => {
    resolve(userContent);
  });
};

const Login = resolve => {
  import('@/components/login/login').then(login => {
    resolve(login);
  });
};

const Register = resolve => {
  import('@/components/register/register').then(register => {
    resolve(register);
  });
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      components: {
        recommed: Recommed,
        singer: Singer,
        rank: Rank,
        search: Search
      }
    },
    {
      path: '/recommend/:id',
      component: Disc
    },
    {
      path: '/singer/:id',
      component: SingerDetail
    },
    {
      path: '/rank/:id',
      component: TopList
    },
    {
      path: '/search/:id',
      component: SingerDetail
    },
    {
      path: '/mymusic/:type',
      component: MyMusic,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mymusic',
      component: MyMusic,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/usercontent',
      component: UserContent,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  let info = router.app.$store.state.userinfo;
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否需要登录权限
    if (info) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
