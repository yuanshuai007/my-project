<template>
  <div class='user_topic'>
    <reuse_child
      :type="'recent_replies'"
    />
  </div>
</template>
<script>
  //import {mapActions,mapState} from 'vuex'
  import dif from '../../common/time_dif.js'
  import * as cookie from '../../common/cookie/cookie.js'
  import reuse_child from './reuse_child'
  export default{
    data(){
      return {
        //loginname:'',
        //user:{}
      }
    },
    components:{
      reuse_child
    },
    computed:{ 
      //...mapState({
        
        //user:state=>state.user.user_data
      //})
    },
    methods:{
      
    }
  }

</script>
<style lang='less' scoped>
  
</style>