import Vue from 'vue'
import Router from 'vue-router'
import MapIndex from '@/components/MapIndex'
import Auth from '@/components/Login';
import Regist from '@/components/Regist';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapIndex',
      component: MapIndex
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    }
  ]
})
