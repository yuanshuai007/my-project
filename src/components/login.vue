<template>
  <div class="login">
    <div class="login_interface">
      <div class="bg">
        <div class="">
        使用cnode官网设置中的accessToken登入
        </div>
        <input type='text' placeholder='将accessToken粘贴至此' v-model='accessToken'/>
        <a class="button button-3d button-action button-pill" @click='logining()'>登录</a>
        <!--<div class="cancel_button" title='取消登录' @click='cancel_login'>
          X
        </div>-->
      </div>
      
    </div>
    
    
  </div>
  
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import * as cookie from '../common/cookie/cookie.js'
  //console.log('store','---',$store.commit);
  export default{
    components:{
	  
	  },
    data:function(){
	    return{
	      accessToken:'',
        //interface_width:0
	    }
	  },
    computed:{ 
      ...mapState({
        isLogin:state=>state.login.isLoginInterface,
        login_redirect:state=>state.login.login_redirect,
        login_to:state=>state.login.login_to
      })
      
    },
    filters:{
      
    },
    methods:{
      /*cancel_login(){
        this.$store.dispatch('login_interface',false);
        //console.log('isLogin','---',this.$store.state.login);
      },*/
      //保存登录通行证
      saveAccessToken(res){
        var expires=3*24*60*60*1000;
        cookie.setCookie('accessToken',this.accessToken,expires);
        //保存用户名
        cookie.setCookie('loginname',res.data.loginname,expires);
      },
      logining(){
          this.$axios.post('https://cnodejs.org/api/v1/accesstoken', {
            accesstoken:this.accessToken
          })
          .then((res)=>{
            console.log('登录时发的请求');
            console.log('loginData','---',res.data);
            this.$store.dispatch('login_userInfo',res.data);
            this.$store.dispatch('login_interface',false);
            this.$store.dispatch('changeLogin',true);
            //保存accesstoken
            this.$store.dispatch('login_info',{accessToken:this.accessToken});
            //设置cookie免登录多长时间
            this.$options.methods.saveAccessToken.bind(this)(res);

            //登录--重定向
            //从cookie中取是否跳转的值
            var allow_jump=cookie.getCookie('allow_jump');
            var fullPath=cookie.getCookie('fullPath');
            if(allow_jump){
              this.$router.push({path:fullPath});
              cookie.deleteCookie('allow_jump');
              cookie.deleteCookie('fullPath');
            }
            //否则就跳到主页
            else{
              console.log('登录后跳转出错');
              this.$router.push({name:'root'});
            }
            //console.log('query','---',this.$route);
          })
          .catch(function (error) {
            console.log('登录错误','---',error);
            //调用提示信息
          });
      }
    },
    updated(){
      //console.log('this.$refs.login','---',this.$refs.login.offsetWidth);
      //console.log('document','---',document.getElementById("login"));
      //if(this.isLogin){
        //  this.interface_width=this.$refs.login.offsetWidth*0.5+'px';  
      //}
      
    }
          
  }

</script>
<style lang="less" scope>
  html,body,#app{
    height:100%;
  }
  .login{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.8);
  }
  .login_interface{
    
    //position:relative;
    color:#fff;
    padding: 20px 15px;
    //z-index:1000;
  }
  input[type="text"],#btn1,#btn2{
    margin:15px auto;
    box-sizing: border-box;
    text-align:center;
    font-size:1.4em;
    height:2.7em;
    border-radius:4px;
    border:1px solid #c8cccf;
    color:#6a6f77;
    -web-kit-appearance:none;
    -moz-appearance: none;
    display:block;
    outline:0;
    padding:0 1em;
    text-decoration:none;
    width:80%;
  }
  .login_background{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:#000;
    opacity:0.2;
  }
  /*.cancel_button { 
      position: absolute;
      left:10px;
      top:10px;
      cursor: pointer;
  }  
  .cancel_button:hover {
       color:#b9e563;     
  }*/
</style>	