<template>
  <div class='topic' id='topic'>
    <div class='container'>
      <div class='title'>
        <div class='up'>
          <span class="top" v-if='detail.top || detail.good'>
            {{detail | isTop}}
          </span>
          <span class='headline'>
            {{detail.title}}
          </span>
	      </div>
        <div class="down">
          <div class="">
            发布于 {{detail.create_at | time_dif}}
          </div>
          <div class="" v-if='detail.author.loginname'>
            作者  {{detail.author.loginname}}
          </div>
          <div class="">
            {{detail.visit_count}} 次浏览
          </div>
          <div class="">
            来自 {{detail.tab | tabName}}
          </div>
        </div>
        <div class="editor" v-if='detail.author.loginname==loginname'>
            <span @click='editor_topic()' class="iconfont icon-edit"></span>
            <span class="iconfont icon-delete"></span>
        </div>
      </div>
      <div  class='content_markdown' v-html='detail.content'>
      </div> 
    </div>
    <reply></reply>
    <editor></editor>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import dif from '../../common/time_dif.js'
  import reply from './reply.vue'
  import editor from './editor.vue'
  //console.log('store','---',$store.commit);
  export default{
  components:{
	  reply,
    editor
	},
  data:function(){
	  return{
	    //top:false
	  }
	},
	computed:{
	  loginname(){
      return this.$cookie.getCookie('loginname');
    },
	  ...mapState({
	    detail:state=>state.topic.detail,
	    userInfo:state=>state.login.userInfo
	  }),

	},
	filters:{
	  time_dif(time){
	    return dif(time);
	  },
	  isTop(detail){
	    if(detail.top==true){
        //this.top=true;
	      return '置顶'
	    }
	    else if(detail.good==true){
        //this.top=true;
	      return '精华'
	    }
	    else{
        //this.top=false;
	      return '错误'
	    }
	  },
	  tabName(variety){
	    var tab={
              share:'分享',
	      ask:'问答', 
	      job:'招聘',
	      dev:'客户端测试'
            }
            return tab[variety]
	  }
	},
	methods:{
	  getData(){
	    var id=this.$route.params.id;
	    this.$axios.get('https://cnodejs.org/api/v1/topic/'+id)
	      .then((res)=>{
          console.log('主题','---',res);
          this.$store.dispatch('topic_setter',res.data.data);
          //console.log('detail','---',this.detail.author.loginname);
        })
        .catch((res)=>{
          console.log(res);
        });
	  },
    editor_topic(){
      //把四个参数保存到临时cookie中
      //1.是否从cookie中读取数据
      //2.tab 3.title 4.content
      this.$cookie.setCookie('t_sw',1);
      this.$cookie.setCookie('t_tab',this.detail.tab);
      this.$cookie.setCookie('t_title',this.detail.title);
      console.log('$(this.detail.content)','--',$(this.detail.content));
      console.log('$(this.detail.content).innert','--',$(this.detail.content)[0].innerText);
      var content=$(this.detail.content)[0].innerText;
      this.$store.dispatch('topic_save_content',content);
      this.$router.push({name:'create_topic',params:{topic_id:this.detail.id}});
    }
	},
	created(){
    //console.log('参数','---',this.$route);
	  this.getData();
    console.log('detail.content','---',this.detail.content);
	  this.$store.dispatch('is_reply_topic',true);
    console.log('is_reply_topic--topic','---',this.$store.state.create_topic.is_reply_topic);
	},
  mounted(){
    //console.log('','---',this.detail);
    console.log('user','---',this.userInfo);
  },      
	//路由钩子
	/*beforeRouteEnter(to,from,next){
	  console.log('to','---',to);
	  console.log('from','---',from);
	  console.log('next','---',next);
	  next((vm)=>{
	    console.log('vm','---',vm);
	  });
	}*/
  }

</script>
<style lang="less">
  
  #topic{
    margin-top:15px;
    .title{
	    text-align:left;
	    padding:10px 5px;
	  }
	  .up{
	    max-width:70%;
	    //display:flex;
	    //align-items:baseline;
	    .top{
	      background: #80bd01;
	      padding:1px 2px;
	      color:#fff;
	      border-radius:3px;
	    }
	    .headline{
	      font-size: 25px;
	      margin-left: 10px;
	      font-weight:bold;
	    }
	  }
	  .down{
	    display:flex;
	    color: #666;
	    font-size: 14px;
	    margin-top: 10px;
	    div{
	      margin:0 5px;
	    }
	    div::before{
	      
	       content:'\2022'
	       //margin:0 5px;
	      
	    }
	  }
    .editor{
      //padding-left: 5px;
      margin-top: 15px;
      span{
        margin-left:5px;
        font-size:18px;
        cursor:pointer;
      }
    }
  }
  @media screen and (max-width:480px){
    #topic .up{
      max-width:100%
    }
  }
</style>	