<template>
  <div class="reply" v-if='detail.reply_count'>
    <div class="container">
      <div class='reply_count'>
        {{detail.reply_count}} 回复
      </div>
      <div class="panel">
        <div class="row" v-for='(obj,index) in detail.replies'>
          <div class="info">
            <img :src="obj.author.avatar_url" width="30px" height="30px" border="0" alt="">
            <span class="author">{{obj.author.loginname}}</span>
            <span class="floor">{{index+1}}楼</span>
            <span class="creat_at">{{obj.create_at | time_dif}}</span>
            <div class="up_reply">
              <span class="iconfont icon-praise" @click='ups(obj,index)'></span>
              <span class="ups">{{obj.ups.length}}</span>
              <span class="iconfont icon-reply" @click='reply(obj,index)'></span>
            </div>
            
          </div>
          <div class="content_markdown" v-html='obj.content'>
            
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
  
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import dif from '../../common/time_dif.js'
  import * as cookie from '../../common/cookie/cookie.js'
  //console.log('store','---',$store.commit);
  export default{
    components:{
	  
    },
    data:function(){
      return{ 
      }
    },
    computed:{
      ...mapState({
        detail:state=>state.topic.detail,
        isLogin:state=>state.login.isLogin,
        accessToken:state=>state.login.info.accessToken,
        userInfo:state=>state.login.userInfo
      }),
      
    },
    filters:{
      time_dif(time){
        return dif(time);
      }
    },
    methods:{
      //把信息存入cookie
      info_cookie(cla,index){
        //把路径和位置存入cookie
        console.log('this.$route','---',this.$route);
        //当前元素的位置.offset().top
        //console.log('icon-praise','---',$('.icon-praise')[index].offsetTop);
        let po=$(cla)[index].offsetTop;
        //$('html,body').animate({scrollTop:320}, 800);
        cookie.setCookie('fullPath',this.$route.fullPath,10*60*1000);
        cookie.setCookie('po',po,10*60*1000);
        cookie.setCookie('allow_jump',1,10*60*1000);
      },
      ups(reply,index){
        //console.log('isLogin','--',this.isLogin);
        //console.log('accesstoken','--',this.accessToken);
        console.log('userInfo','--',this.userInfo);
        if(this.isLogin){
          this.$axios.post('https://cnodejs.org/api/v1/reply/'+reply.id+'/ups',{
            accesstoken:this.accessToken
          })
          .then((res)=>{
            console.log('upsData','---',res.data);
            var action='';
            //三个数据 reply.id,user.id,action
            if(res.data.success){ 
              var obj={
                replyId:reply.id,
                authorId:this.userInfo.id,
                action:res.data.action
              }  
              this.$store.dispatch('topic_reply_info',obj);
            }else{
              console.log('点赞error');
            }
          })
          .catch(function (error) {
            console.log('点赞','---',error);
            //调用提示信息
          });
        }
        else{
          this.$options.methods.info_cookie.bind(this)('.icon-praise',index);
          //进入登录页面
          this.$router.push({name:'login'});
          
        }
      },
      reply(obj,index){
        //console.log('reply_isLogin','---',this.isLogin);
        if(this.isLogin){
          //console.log('reply_isLogin222','---',this.isLogin);
          //console.log('obj','---',obj);
          var temp={
            loginname:obj.author.loginname,
            replyId:obj.id,
            input_num:1
          };
          this.$store.dispatch('topic_replyTemp',temp);
          $('html,body').animate({scrollTop: $(document).height()-$(window).height()}, 800);

        }else{
          this.$options.methods.info_cookie.bind(this)('.icon-reply',index);
          //进入登录页面
          this.$router.push({name:'login'});
        }
      }
    },
    mounted(){
      //console.log('replythis','---',this);
      var po=cookie.getCookie('po');
      $('html,body').animate({scrollTop:po}, 800);
      cookie.deleteCookie('po');
      cookie.deleteCookie('fullPath');
      //cookie.deleteCookie('allow_jump');
    }
        
  }

</script>
<style lang="less">
  @import '../../common/darkdown.less';
  .reply{
    //background:#f6f6f6;
    //padding:20px 15px;
    margin-top:20px;
    text-align:left;
  }
  .reply_count{
    
    //background:#fff;
    padding:15px 0;
  }
  .panel{
    //background:#f6f6f6;
    .row .info{
      text-align:left;
      font-size: 14px;
      img{
        vertical-align:middle;
        border-radius:3px;
      }
      .author{
         margin: 0 5px;
      }
      .floor,.creat_at{
        color:#005580;
      }
      .creat_at::before{
        content:'\2022';
        color:#005580;
      }
      .up_reply{
        float: right;
        font-size: 18px;
        display: flex;
        align-items: center;
        .ups{
          font-size:18px;
          margin:0 8px;
        }
        .iconfont{
          font-size:20px;
          cursor:pointer;
        }
      }
      
    }
 
  }
</style>	