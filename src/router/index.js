import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as cookie from '../common/cookie/cookie.js'

import topic from '@/components/topic/topic.vue'
import root from '@/components/root'
import user from '@/components/user/user.vue'
import tab from '@/components/tab'
import login from '@/components/login'
import create_topic from '@/components/create_topic/create_topic.vue'
import user_topic from '@/components/user/user_topic.vue'
import user_reply from '@/components/user/user_reply.vue'

import axios from 'axios'
//Vue.config.productionTip = false
//Vue.prototype.$axios=axios;
Vue.use(Router)
//http://localhost:8080/#/topic/1
var router=new Router({
  routes: [
    {
      path:'*',
      redirect:'/'
    },
    {
      path: '/',
      name: 'root',
      components:{
        default:root,
        tab
	    }
    },
    {
      path:'/topic/:id',
      name:'topic',
      component:topic
    },
      {
      path:'/user',
      name:'user',
      component:user,
      meta:{
        auth:true
      }
    },
    {
      path:'/create_topic',
      name:'create_topic',
      component:create_topic,
      meta:{
        auth:true
      }
    },
    {
      path:'/user/:loginname/topic',
      name:'user_topic',
      component:user_topic,
      meta:{
        auth:true
      }
    },
    {
      path:'/user/:loginname/reply',
      name:'user_reply',
      component:user_reply,
      meta:{
        auth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ]
})
//console.log('路由里面的函数');
//刷新登录验证
//免登陆
//console.log('app de mounted');
//console.log(cookie.getCookie('accessToken'));
/*if(cookie.getCookie('accessToken')){
  //console.log('app发登录验证请求');
  axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken:cookie.getCookie('accessToken')
    })
    .then((res)=>{
      //console.log(11111111111);
      if(res.data.success){
        //console.log('loginData','---',res.data);
        store.dispatch('login_userInfo',res.data);
        //store.dispatch('login_interface',false);
        store.dispatch('changeLogin',true);
        //console.log('刷新app--isLogin','---',store.state.login.isLogin);
        //保存信息
        var accessToken=cookie.getCookie('accessToken');
        //console.log('accessToken','---',accessToken);
        store.dispatch('login_info',{'accessToken':accessToken});
      }
    })
    .catch(function (error) {
      console.log('登录错误','---',error);
      //调用提示信息
    });
}*/
if(cookie.getCookie('accessToken')){
  store.dispatch('changeLogin',true);
  store.dispatch('login_userInfo',{id:'',loginname:cookie.getCookie('loginname')});
  store.dispatch('login_info',{'accessToken':cookie.getCookie('accessToken')});
}
router.beforeEach((to,from,next)=>{
  if(to.matched.some( m => m.meta.auth)){        
    if(store.state.login.isLogin==true) {       
      next()     
    }else{   
      console.log('路由里面检测到未登录');
      console.log('store.state.login.isLogin','---',store.state.login.isLogin);
      console.log('to','---',to);
      
      cookie.setCookie('fullPath',to.fullPath);  
      cookie.setCookie('allow_jump',1);
      //console.log('login_redirect','---',store.state.login.login_redirect);
      //消息提示:请登录
      //store.dispatch('message_show',true);
      //store.dispatch('message_msg','请先登录');
      next({name:'login'})
  　  //next({name:'login',query:{ redirect: to.name} })
    } 
　}else{ 
　　next() 
　} 
});
export default router;