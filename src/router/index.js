import Vue from 'vue'
import Router from 'vue-router'
import MapIndex from '@/components/MapIndex'
import Auth from '@/components/Login';
import Regist from '@/components/Regist';
import ForgotPassword from '@/components/ForgotPassword';
import ResetPassword from '@/components/ResetPassword';
import UserProfile from '@/components/UserProfile';
import TaskList from '@/components/TaskList';
import PublishTask from '@/components/PublishTask';
import TaskDesc from '@/components/TaskDesc';
import MultConditionsTaskList from '@/components/MultConditionsTaskList';
import UploadAnswer from '@/components/UploadAnswer';
import AnswerDesc from '@/components/AnswerDesc';
import Pay from '@/components/Pay';
import Message from '@/components/Message';
import ReceiveTaskList from '@/components/ReceiveTaskList';
import PublishDiscuss from '@/components/PublishDiscuss';
import DiscussList from '@/components/DiscussList';
import DiscussDesc from '@/components/DiscussDesc';


// 默认不传参数返回上一个路由，否则跳转到指定路由
Router.prototype.goBack = function(url) {
  this.isBack = true;
  if(url) {
    this.replace(url);
  }else {
    this.go(-1); // 
  } //
}

Vue.use(Router)

const router =  new Router({
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
      meta: {
        requireAuth: true
      },
      component: UserProfile
    },
    {
      path: '/tasks',
      name: 'TaskList',
      component: TaskList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/publish',
      name: 'PublishTask',
      component: PublishTask,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/task/:id',
      name: 'TaskDesc',
      component: TaskDesc,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/multConditions',
      name: 'MultConditionsTaskList',
      component: MultConditionsTaskList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/upload/:id',
      name: 'UploadAnswer',
      component: UploadAnswer,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/answer/:id',
      name: 'AnswerDesc',
      component: AnswerDesc,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/pay/:id',
      name: 'Pay',
      component: Pay,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'Message',
      path: '/message',
      component: Message,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'ReceiveTaskList',
      path: '/receive_tasks',
      component: ReceiveTaskList,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'PublishDiscuss',
      path: '/discuss/publish',
      component: PublishDiscuss,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'DiscussList',
      path: '/discuss/lists',
      component: DiscussList,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'DiscussDesc',
      path: '/discuss/desc/:id',
      component: DiscussDesc,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from , next) => {
  if(to.matched.some(res => res.meta.requireAuth)) {
    if(localStorage.getItem('token')) {
      next();
    }else {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      })
    }
  }else {
    next();
  }
})

export default router;

