// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAMap from 'vue-amap';
import router from './router'
import store from './store';
import './common/rem';
import setTokenHeader from './util/settokenheader';
import axios from 'axios';
import { Cell, 
  CellGroup, 
  Popup, 
  Collapse, 
  CollapseItem, 
  Tag, 
  Icon, 
  Button, 
  Switch,
  Col,
  Row,
  Field,
  Toast,
  Radio,
  RadioGroup,
  NavBar,
  Search,
  List,
  Dialog,
  Loading,
  Checkbox, 
  CheckboxGroup,
  Picker,
  Panel,
  Uploader
} from 'vant';
Vue.use(Cell)
  .use(CellGroup)
  .use(Popup)
  .use(CollapseItem)
  .use(Collapse)
  .use(Tag)
  .use(Icon)
  .use(Button)
  .use(Switch)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(Toast)
  .use(Radio)
  .use(RadioGroup)
  .use(NavBar)
  .use(Search)
  .use(List)
  .use(Dialog)
  .use(Loading)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Picker)
  .use(Panel)
  .use(Uploader);

Vue.use(VueAMap);
// 任何将要使用的插件在这里引入
VueAMap.initAMapApiLoader({
  key: '98e1bd20267d10291578b33194acfd40',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4'
})
Vue.config.productionTip = false

axios.interceptors.response.use(data => data, (error) => {
  if(error.response) {
    switch(error.response.status) {
      case 401: {
        localStorage.removeItem('token');
        router.replace({
          path: '/auth',
          query: {redirect: router.currentRoute.fullPath}
        })
      }
    }
  }
  return Promise.reject(error);
})


if(window.localStorage) {
  setTokenHeader(localStorage.getItem('token'));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

