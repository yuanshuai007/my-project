<template>
  <div class='container'>
   
    <div class='tabs'>
    <template v-for='(obj,index) in ary'>
      
      <!--<div>{{key+'--'+val}}</div>-->
      <div class='tab' :class="{'active':obj.isActive}" @click='changeTab(index)'>
        {{obj.tab}}
      </div>
      
    </template>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  require('../common/utility/jquery.cookie.js');
  export default{
    data:()=>{
      return {
        ary:[
	  {
	    tab:'全部',
      tab_english:'',
	    isActive:1
	  },
	  {
	    tab:'精华',
      tab_english:'good',
	    isActive:0
	  },
	  {
	    tab:'分享',
      tab_english:'share',
	    isActive:0
	  },
	  {
	    tab:'问答',
      tab_english:'ask',
	    isActive:0
	  },
	  {
	    tab:'招聘',
      tab_english:'job',
	    isActive:0
	  },
	  {
	    tab:'客户端测试',
      tab_english:'dev',
	    isActive:0
	  }
	  //tabs:['全部','精华','分享','问答','招聘','客户端测试'],
	  //isActives:[1,0,0,0,0,0]
	],
        type:{
	  0:'',
	  1:'good',
	  2:'share',
	  3:'ask',
	  4:'job',
	  5:'dev'
	}
      }
    },
    methods:{
      changeTab(index){
        //把tab存入cookie
        //console.log('cookie111111','---',$.cookie);
        //$.cookie('the_cookie', 'the_value');
        this.$cookie.setCookie('tab',this.type[index]);
        //this.$cookie.setCookie('test','000');
        this.ary.forEach((val,key)=>{
          val.isActive=0;
        });
        this.ary[index].isActive=1;
      //正在加载数据的动画
            this.$store.dispatch('changeLoading',true);
      //获取数据
      this.$axios.get('https://cnodejs.org/api/v1/topics?tab='+this.type[index])
            .then((res)=>{
         console.log('数据','---',res);
         this.$store.dispatch('r_data',res.data.data);
         this.$store.dispatch('changeLoading',false);
      });
          }
    },
    created(){
      var tab=this.$cookie.getCookie('tab') || '';
      this.ary.forEach((val,key)=>{
          val.isActive=0;
          if(val.tab_english==tab){
            val.isActive=1;
          }
      });
        //this.ary[index].isActive=1; 
    }	
  }
  
</script>
<style lang='less' scoped>
  @import '../assets/css/fading_circle.less';
  .tabs{
    display:flex;
    align-items:center;
    padding:10px 0;
  }
  .tab{
      color:#80bd01;
      padding:2px 3px;
      margin-left:15px;
      cursor:pointer;
    }
  .active{
    color:#fff;
    background:#80bd01;
    border-radius:3px;
    
  }
  
</style>