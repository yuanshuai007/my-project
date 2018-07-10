<template>
  <div class="create_topic" id='create_topic'>
    <div class="publish_topic container">
        发布话题
    </div>
    <div class="container">
      <div class="form-horizontal">
         <div class="form-group">
           <label for="tab1" class="control-label">选择板块</label>
           <div class="controls">
             <select v-model='tab' class="form-control">
              <option  v-for='obj in tab_name' :value='obj.english_tab'>{{obj.chinese_tab}}</option>
             </select>
           </div>
         </div>
         <div class="form-group">
           <label for="title1" class="control-label">标题</label>
           <div class="controls">
             <input type='text' v-model='title' class='form-control' placeholder='标题十个字以上'/>
           </div>
         </div>
      </div>
    </div>
    <editor/>
  </div>
  
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import editor from '../topic/editor.vue'
  export default{
    components:{
	    editor
	  },
    data:function(){
	    return{
	      tab:'请选择',
        title:'',
        tab_name:[
          {
            english_tab:'请选择',
            chinese_tab:'请选择'
          },
          {
            english_tab:'share',
            chinese_tab:'分享'
          },
          {
            english_tab:'ask',
            chinese_tab:'问答'
          },
          {
            english_tab:'job',
            chinese_tab:'招聘'
          },
          {
            english_tab:'dev',
            chinese_tab:'客户端测试'
          }
        ]
	    }
	  },
    watch:{
      tab(val){
        this.$store.dispatch('create_topic_info',{tab:val}); 
      },
      title(val){
        this.$store.dispatch('create_topic_info',{title:val}); 
      }
    },
    computed:{
      ...mapState({
        isLogin:state=>state.login.isLoginInterface,
        detail:state=>state.topic.detail
      })
    },
    filters:{
      
    },
    methods:{
      
    },
    created(){
      //显示提交按钮,隐藏回复按钮
      this.$store.dispatch('is_reply_topic',false);
      
    },
    mounted(){
      //console.log('route','--',this.$route.params.topic_id);
      /*if(this.$route.params.topic_id){
        /*var detail_tab='';
        this.tab_name.forEach((val,index)=>{
          if(this.detail.tab==val.english_tab){
            detail_tab=val.chinese_tab;
          }
        });
        this.tab=this.detail.tab;
        //console.log('detail_tab','--',detail_tab);
        this.title=this.detail.title;
      }*/
      if(this.$cookie.getCookie('t_sw')){
        this.tab=this.$cookie.getCookie('t_tab');
        this.title=this.$cookie.getCookie('t_title');
      }
    },
    destroyed(){
      this.$cookie.deleteCookie('t_sw');
      this.$cookie.deleteCookie('t_tab');
      this.$cookie.deleteCookie('t_title');
      this.$cookie.deleteCookie('t_content');
    }
  }

</script>
<style lang="less" scoped>
  // @import 'bootstrap/dist/css/bootstrap.min.css';
  .form-horizontal{
    padding-top: 20px;
    .form-group{
      margin-bottom: 20px;
    }
    label{
      float: left;
      width: 85px;
      padding-top: 5px;
      text-align: right;
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
    }
    .controls{
      margin-left: 105px;
      text-align: left;
    }
    .form-control[type='text']{
      margin:0;
    }
    .form-control{
      box-sizing:border-box;
      width: 220px;
      border: 1px solid #ccc;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      padding: 4px 6px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #555;
      vertical-align: middle;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }
  .editor{
    margin-top: -15px;  
  }
  .container{
    //padding:0;
  }
  .create_topic{
    margin-top: 20px;
  }
  .publish_topic{
    background-color: #f6f6f6;
    text-align: left;
    color: #999;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }
  
   @media screen and (max-width:480px){
      .title{
        //box-sizing:border-box;
        width:100%;
      }
  }  
</style>	