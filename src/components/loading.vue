<template>
  
    <div class="loading" v-if='isLoading'>
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
    </div>
    
  
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default{
    
    computed:{
      ...mapState({
	    isLoading:state=>state.loading.isLoading
	 })
    }
  }
  
</script>
<style lang='less' scoped>
  @import '../assets/css/fading_circle.less';
  .loading{
    position:fixed;
    top:80px;
    left:50%;
    margin-left: -20px;
  }
</style>