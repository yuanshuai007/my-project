
<template>
  <div class='root'>
   <div class='container'>
    
     <div v-if='!req_data'>
       没有请求回来数据 检查网络
     </div>
     <template v-for='obj in topic' v-if='req_data'>
     
       <div class='row'>
       
         <img :src='obj.author.avatar_url' :title="obj.author.loginname"/>
	 <span class='reply'>
           <span class='reply_count'>{{obj.reply_count}}</span>
           <span>/</span>
           <span class='visit_count'>{{obj.visit_count}}</span>
	 </span>
         <span class='tab' v-if="!(obj.tab=='dev') || obj.top">{{obj | tabName}}</span>
         <router-link :to="{name:'topic',params:{id:obj.id}}" class='title'>
           <span>{{obj.title}}</span>
         </router-link>
       
         <span class='last_reply_at'>
           {{obj.last_reply_at | time_dif}}
         </span>
       </div>
     </template>
     
   </div>
 </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import dif from '../common/time_dif.js'
import get_page_size from '../common/utility/page_size.js'
export default{
  data:function(){
    return {
      req_data:true,
      limit:40
      //topic:{}
    }
  },
  computed:{
    ...mapState({
      topic:state=>state.root.topic
    })
  },
  watch:{
    topic:function(val){
      console.log('vallll','---',val);
      
    }
  },
  methods:{
  
  },
  filters:{
    tabName:function(obj){
      var result="";
      var tab={
        share:'分享',
        ask:'问答',
        job:'招聘',
        dev:'客户端测试'
      };
      if(obj.top==true){
        return '置顶'
      }
      else if(obj.good==true){
        return '精华'
      }
      else{
        $.each(tab,function(key,val){
          if(obj.tab==key){
            //console.log('key has found'+val);
            result=val;
            return ;
          }
        });
	      return result;
      }
      
    },
    time_dif:function(time){
     //console.log('函数','---',dif);
     /*var end_time=new Date(time).getTime();
      //console.log('time','----',end_time.getTime());
      var now_time=new Date().getTime();
      var dif=now_time-end_time;
      console.log('dif','---',dif);
      
      if(parseInt(dif/1000/3600/24)){
        return parseInt(dif/1000/3600/24)+'天前'
      }
      else if(parseInt(dif/1000/3600)){
        return parseInt(dif/1000/3600)+'小时前';
      }
      else{
        return parseInt(dif/1000/60)+'分钟前';
     }*/
     //console.log('时间差执行结果','---',dif(time));
     return dif(time);
    }
  },
  created(){
    //console.log('root de created');
    //从cookie里面取tab
    var tab=this.$cookie.getCookie('tab') || '';
    console.log('tab','---',tab);
    //获取数据
    this.$axios.get('https://cnodejs.org/api/v1/topics',{
      params:{
        limit:this.limit,
        tab:tab
      }
    })
    .then((res)=>{
       console.log('数据','---',res);
       this.$store.dispatch('r_data',res.data.data);
     });
     /*var that=this;
     $.ajax({ 
        type: "get", 
        async: false, 
        url: "https://cnodejs.org/api/v1/topics?limit="+this.limit+"&tab="+tab,
        success: function(res) {
          that.topic=res.data.data;
        }

    });
    ;
     $.get("https://cnodejs.org/api/v1/topics?limit="+this.limit+"&tab="+tab, function(res){
       console.log('数据','---',res);
       that.topic=res.data.data;
       that.$store.dispatch('r_data',res.data.data);
     });*/
  },
  mounted(){
    //console.log('mounted','---',this);
    console.log('this.topic','----',this.topic);
    //滚动到底部
    let sw=1;
    let num=1;
    console.log('this.$route.name','---',this.$route.name);
    if(this.$route.name=='root'){
      $(window).scroll(()=>{
        var page_size=get_page_size();
        console.log('执行了下拉请求数据');
        //$(document).height()-$(window).height()
        console.log('document.height','---',page_size.page_height);
        console.log('window.height','---',page_size.window_height);
        console.log('$(document).scrollTop','---',$(document).scrollTop());
        if($(document).scrollTop()>=page_size.page_height-page_size.window_height){
          console.log('swswsw');
          if(sw){
            console.log('准备请求下拉数据');
            this.$store.dispatch('changeLoading',true);
            sw=0;
            this.$axios.get('https://cnodejs.org/api/v1/topics',{
              params:{
                limit:this.limit+num*10
              }
            })
            .then((res)=>{
               num++;
               console.log('下拉数据请求成功','---',res);
               this.$store.dispatch('r_data',res.data.data);
               sw=1;
               this.$store.dispatch('changeLoading',false);
            });  
          }
            
        }
      });
    }
    
  },
  activated(){
    console.log('root de activated');
  },
  destroyed(){
    $(window).unbind();
  }
  
}
</script>
<style scoped lang='less'>
  @media screen and (max-width:980px){
    .reply{
      
      display:none;
    }
    .title{
      max-width:60%;
    }
    .tab{
      margin-left:3px;
    }
    .last_reply_at{
      
      font-size:12px;
      
    }
  }
  
  
  .row{
    display:flex;
    
    align-items:center;
    height:50px;
    padding:5px;
    border-bottom:1px solid #ddd;
    
      .title{
        max-width:70%;
        text-align:left;
        padding-left:5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tab{
        background: #80bd01;
        padding:1px 2px;
	color:#fff;
	border-radius:3px;
	
      }
      .reply{
        margin:0 5px;
	width:80px;
	.reply_count{
	  color:#9e78c0;
	  font-size: 18px;
	}
	.visit_count{
	  font-size: 14px;
          color: #b4b4b4;
	} 
      }
      img{
        width:30px;
        height:30px;
	border-radius:3px;
	
      }
      .last_reply_at{
      
        margin-left:auto;
      
      }
      .title{
        color:#888;
      }
      a{
        text-decoration:none;
      }
    
    
  }
  @media screen and (max-width:480px){
    
    .row .title{
      max-width:50%;
    }
  }
  /*.last_reply_at{
      display:none; 
    }*/
</style>
