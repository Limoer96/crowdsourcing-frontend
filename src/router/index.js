import Vue from 'vue'
import Router from 'vue-router'
import MapIndex from '@/components/MapIndex'
import Auth from '@/components/Login';
import Regist from '@/components/Regist';
import ForgotPassword from '@/components/ForgotPassword';
import ResetPassword from '@/components/ResetPassword';
import UserProfile from '@/components/UserProfile';

Router.prototype.goBack = function(url) {
  this.isBack = true;
  this.push(url); //
}

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
    },
    {
      path: '/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset_password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    }
  ]
})

