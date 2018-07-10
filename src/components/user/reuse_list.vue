<template>
  <div class='reuse_list'>
    <div class="container">
      <div class="content">
        <div class="" v-for='(obj,index) in list' v-if='row_start<=index && index<=row_end'>
          <img :src="obj.author.avatar_url" width="30px" height="30px" border="0" alt="">
          <span class="content_title" @click='jump(obj.id)'>{{obj.title}}</span>
          <span class="time">{{obj.last_reply_at | time_dif}}</span>
        </div>
      </div>
      <div class="more" @click='more()'>
        查看更多»
      </div>
    </div>  
  </div>
</template>
<script>
  //import {mapActions,mapState} from 'vuex'
  import dif from '../../common/time_dif.js'
  //import more from './reuse_more.vue'
  export default{
    data(){
      return {
        row_start:0,
        row_end:4
      }
    },
    props:['list','next_','loginname'],
    components:{ 
      
    },
    methods:{
      jump(id){
        this.$router.push({name:'topic',params:{id:id}});
      },
      more(){
        this.$router.push({name:this.next_,params:{loginname:this.loginname}});
      }
    },
    filters:{
      time_dif(time){
        return dif(time);
      }
    },
    mounted(){
      
    }  
  }

</script>
<style lang='less' scoped>
  @page_border_color:#ddd;
  .reuse_list{
    margin-top: 20px;
    text-align: left;
  }
  .content{
     border-bottom: 1px solid #eee;
  }
  .content>div{
    padding:5px 0;
    img{
      vertical-align: bottom;
    }
    .content_title{
      cursor:pointer;
      font-size: 16px;
      color: #08c;
      padding: 0 15px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      display: inline-block;
      width:50%;
     
    }
    .time{
      font-size:14px;
    }
  }
  .more{
    padding:5px 0;
    border-bottom: 1px solid #eee;
    cursor:pointer;
  }
</style>