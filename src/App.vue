<template>
  <div id="app">
    <cm_header></cm_header>
    <router-view name='tab'/>
    <keep-alive include='root'>
      <router-view/>
    </keep-alive>
    <loading></loading>
    <message/>
  </div>
</template>

<script>
  import cm_header from './components/cm_header.vue'
  import loading from './components/loading.vue'
  //import login from './components/login.vue'
  
  import message from './components/message/message.vue'
  export default {
    data(){
      return {
        com:'root'
      }
    },
    name: 'App',
    components:{
      cm_header,
      loading,
      message
    },
    created(){
      
    }
    /*activated(){
      console.log('开启keep-alive');
    }*/
  }
</script>

<style>
  @import './common/darkdown.less';
  @import './assets/css/buttons.css';
  @import './common/style/icon.css';

  body{
    margin:0;
    background-color: #e1e1e1;
    
  }
  #app {
    position:relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  @media screen and (max-width:1200px){
      .container{
        box-sizing:border-box;
        width:100%;
        margin:0 auto;
        background:#fff;
        padding:10px;
      }
    }
  @media screen and (min-width:1200px){
      .container{
        box-sizing:border-box;
        width:1200px;
        margin:0 auto;
        background:#fff;
        padding:10px;
      }
    }
</style>
