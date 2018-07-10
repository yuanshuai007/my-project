<template>
    <div class="message" v-if='is_show'>
      <div class="">
        {{msg}}
      </div>
      <div  @click='sure()'>
        <span class="btn">确定</span>
      </div>
    </div>
</template>

<script>
    //import markdown from './markdown'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
               
            }
        },
        computed: {
            //自己加的replyTemp:state=>state.topic.replyTemp
            ...mapState({
              msg:state=>state.message.msg,
              is_show:state=>state.message.is_show
            })
        },
        components: {
            
        },
        methods: {
            sure(){
              this.$store.dispatch('message_show',false);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .message{
    position:fixed;
    left:50%;
    width:200px;
    margin-left:-100px;
    top:80px;
    background: #FF4351;
    border-radius: 3px;
    color: #fff;
  }  
  .btn{
    cursor: pointer;
  }
</style>