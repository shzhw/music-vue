import Vue from 'vue';
import Router from 'vue-router';
import Recommed from '@/components/recommed/recommed';
import Singer from '@/components/singer/singer';
import Rank from '@/components/rank/rank';
import Search from '@/components/search/search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommed
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ],
  linkActiveClass: 'active'
});
