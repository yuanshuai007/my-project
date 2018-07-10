<template>
  <div class='user'>
    <div class="container">
      <div class="title">
        <div class="avatar">
          <img :src="user.avatar_url" width="50px" height="50px" border="0" alt=""></span>
          <span class="">{{user.loginname}}</span>
        </div>
        <div class="score">
          积分 {{user.score}}
        </div>
        <div class="">
          <span class="iconfont icon-github"></span>
          <a :href="'https://github.com/'+user.githubUsername" target='_blank'>@{{user.githubUsername}}</a>
        </div>
        <div class="">
          注册时间 {{user.create_at | time_dif}}
        </div>
      </div> 
    </div>
    <reuse_list
      :list='user.recent_topics'
      :next_="'user_topic'"
      :loginname='loginname'
    />
    <reuse_list
      :list='user.recent_replies'
      :next_="'user_reply'"
      :loginname='loginname'
    />
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import dif from '../../common/time_dif.js'
  import * as cookie from '../../common/cookie/cookie.js'
  import reuse_list from './reuse_list'
  export default{
    data(){
      return {
        user:{},
        loginname:''
      }
    },
    components:{
      reuse_list
    },
    computed:{ 
      ...mapState({
        
        //user:state=>state.user.user_data
      })
    },
    methods:{
      /*child_title_show(arg){
        this.is_title=arg;
      },
      title_show(){
        //显示标题
        this.is_title=true;
        //隐藏便签页
        this.$store.dispatch('user_is_page',false);
      }*/
    },
    filters:{
      time_dif(time){
        return dif(time);
      }
    },
    created(){
      this.loginname=cookie.getCookie('loginname');
      var that=this;
      console.log('获取user之前');
      //console.log('loginname','---',loginname);
      //console.log('取信息','---',this.$store.state.login.userInfo);
      this.$axios.get('https://cnodejs.org/api/v1/user/'+this.loginname)
        .then(function (res) {
          console.log(res);
          console.log('获取user');
          that.user=res.data.data;
          //this.$store.dispatch('user_data',res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

</script>
<style lang='less' scoped>
  .title{
    text-align:left;
    padding:15px;
    margin-top: 20px;
    >div{
      padding:10px 0;
    }
    .avatar img{
      vertical-align:top;
      margin-right: 10px;
    }
    .score{
      font-size: 15px;
    }
  }
  /*.homepage{
    padding: 10px 0;
    text-align: -webkit-left;
    cursor: pointer;
    color: #08c;
    margin-top: 20px;
  }*/
  
</style>