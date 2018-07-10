<template>
  <div class='header'>
    <div class='container'>
    <router-link class='brand' to='/'>
      <img :src='brand'>
    </router-link>
    <div class='list'>
      <div class='fisrt_page'>首页</div>
      <div class='freshman'>新手入门</div>
      <div @click='login()' v-if='!isLogin'>登录</div>
      <div class="login-btn" v-if='isLogin'>
        <div class="login-word">
          {{userInfo.loginname}}
        </div>
        
        <div class="drop-down">
          <div class="box">
            <div class="arrow">
              <span class="arrow-out">
                <i class='arrow-in'></i>
              </span>
            </div>
            <div class="content">
              <div class="" @click='loginOut()'>
                登出
              </div>
              <div class="" @click='user()'>
                个人中心
              </div>
              <div class="" @click='create_topic()'>
                发布话题
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>注册</div>
    </div>
    </div>
  </div>
</template>
<script>
  //console.log('@');
  import {mapState,mapMutations,mapActions} from 'vuex'
  import * as cookie from '../common/cookie/cookie.js'
  export default{
    name:'cm_header',
    data:function(){
      return {
        brand:require('../assets/cnodejs_light.svg')
      }
    },
    computed:{ 
      ...mapState({
        isLoginInterface:state=>state.login.isLoginInterface,
        isLogin:state=>state.login.isLogin,
        userInfo:state=>state.login.userInfo
      })
    },
    methods:{
      login(){
        //只是进入登录界面
        console.log('点登录键的时候的this.$route','---',this.$route);
        cookie.setCookie('fullPath',this.$route.fullPath,10*60*1000);  
        cookie.setCookie('allow_jump',1,10*60*1000);
        this.$router.push({name:'login'});
      },
      loginOut(){
        cookie.deleteCookie('accessToken');
        this.$store.dispatch('changeLogin',false);
        this.$router.push({name:'root'});
      },
      create_topic(){
        this.$router.push({name:'create_topic'});
      },
      user(){
        this.$router.push({name:'user'});
      }
    }
  }

</script>
<style lang='less' scoped> 
  
  .header{
    width:100%;
    background:#444;
  }
  .container{
    background:#444;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    
  }
  .brand{
    //width:200px;
    height:40px;
    
    display:flex;
    align-items:center;
    img{
      max-width:100%;
      height:100%;
    }
  }
  .list{
    display:flex;
    color:white;
    align-items: baseline;
    justify-content:space-between;
    >div{
      padding:2px 10px;
      cursor:pointer;
    }
  }
  .login-btn{
    position:relative;
    .login-word{
      width: 80px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .login-btn:hover .drop-down{
    display:block;
  }
  .drop-down{
    display:none;
    color:#000;
    position: absolute;
    //left: 88px;
    top: 34px;
    //margin-left: -80px;
    z-index: 1001;
      .box{
      position: relative;
      border: 1px solid #e4e4e4;
      background-color: #444;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
      border-radius: 5px;
      z-index: 1;
      padding:0;
    }
    .arrow{
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -7px;
      padding:0;
    }
    .arrow-out{
      border-color: transparent transparent #e4e4e4;
      top: -14px;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px;
    }
    .arrow-in{
      border-color: transparent transparent #fff;
      left: -7px;
      top: -6px;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px;
    }
    .content{
      width:80px;
      background-color: #fff;
      padding:0;
      div{
        padding:10px 0;
      }
      //padding-top: 14px;
      //padding-bottom: 7px;
    }
    
  }
  @media screen and (max-width:480px){
    .brand{
      padding:0 5px;
      max-width: 38%;
    }
    .freshman,.fisrt_page{
      display:none;
    }
  }
  
</style>