<template>
  <div class='reuse_child'>
    <div class="container">
      <div class="title">
        {{loginname}} 主页
      </div>
      <div class="content">
        <div class="" v-for='(obj,index) in user[type]' v-if='row_start<=index && index<=row_end'>
          <img :src="obj.author.avatar_url" width="30px" height="30px" border="0" alt="">
          <span class="content_title" @click='jump(obj.id)'>{{obj.title}}</span>
          <span class="time">{{obj.last_reply_at | time_dif}}</span>
        </div>
      </div>
      <div class="page">
        <span class="first" @click='show_start()'>«</span>
        <span v-for='val in page_ary' :class="val.cla" @click='show_page(val.page)'>{{val.page}}</span>
        <span class="end" @click='show_end()'>»</span>
      </div>
    
    </div>  
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import dif from '../../common/time_dif.js'
  import * as cookie from '../../common/cookie/cookie.js'
  export default{
    data(){
      return {
        user:{},
        page_ary:[],
        //每页显示的条数
        row:3,
        row_start:0,
        row_end:2,
        //前一个有样式的下标
        pre_cla:0,
      }
    },
    props:['type'],
    computed:{ 
      
    },
    methods:{
      jump(id){
        this.$router.push({name:'topic',params:{id:id}});
      },
      show_page(index){
        this.row_start=(index-1)*this.row;
        this.row_end=(index-1)*this.row+this.row-1;
        this.page_ary[this.pre_cla].cla='';
        this.page_ary[index-1].cla='active';
        this.pre_cla=index-1;
      },
      show_start(){
        this.$options.methods.show_page.bind(this)(1);
      },
      show_end(){
        var end=Math.ceil(this.user[this.type].length/this.row);
        this.$options.methods.show_page.bind(this)(end);
      },
      c_page(len){
        //console.log('len','---',len);
        for(let i=1;i<=Math.ceil(len/this.row);i++){
          var obj={};
          obj.page=i;
          obj.cla='';
          //j=i;
          //console.log('i','---',i);
          //console.log('obj','---',obj);
          this.page_ary[i-1]=obj;
          //console.log('page_ary','---',this.page_ary);
        }
        //console.log('this.page_ary','---',this.page_ary);
        
        this.page_ary[this.pre_cla].cla='active';
        //this.row_end=2;
      }
    },
    filters:{
      time_dif(time){
        return dif(time);
      }
    },
    created(){
      this.loginname=cookie.getCookie('loginname');
      var that=this;
      //console.log('获取user之前');
      //console.log('loginname','---',loginname);
      //console.log('取信息','---',this.$store.state.login.userInfo);
      this.$axios.get('https://cnodejs.org/api/v1/user/'+this.loginname)
        .then(function (res) {
          //console.log(res);
          //console.log(that);
          that.user=res.data.data;
          //生成页码
          that.c_page(res.data.data[that.type].length);
          //this.$store.dispatch('user_data',res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } 
  }

</script>
<style lang='less' scoped>
  @page_border_color:#ddd;
  .reuse_child{
    margin-top: 20px;
    text-align: left;
  }
  .title{
    margin: 0 -15px;
    padding: 10px;
    background: #f6f6f6;
    border-bottom: 1px solid #eee;
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
  .page{
    padding:5px 0;
    font-size:0;
    .first{
      border-left: 1px solid @page_border_color;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
    .end{
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
    .active{
      color:#80bd01
    }
    >span:hover{
      background-color: #f5f5f5;
    }
    >span{
      font-size:14px;
      border-bottom: 1px solid @page_border_color;
      border-top: 1px solid @page_border_color;
      border-right: 1px solid @page_border_color;
      line-height: 20px;
      color:#999;
      //height: 20px;
      display: inline-block;
      text-align:center;
      padding: 4px 12px;
      //line-height: 20px;
      cursor:pointer;
    }
  }
</style>