<template>
    <div class="mdContainer" :class="{ fullPage: fullPageStatus }">
        <div class="navContainer" v-if="navStatus">
            <div class="nameContainer" v-if="icoStatusP" @click="happyDay">OVEN-mdEditor</div>
            <div class="markContainer">
                <ul class="markListGroup" id='markListGroup'>
                    <li class="markListItem leave" @click="addStrong" title="strong"><b>B</b></li>
                    <li class="markListItem leave" @click="addItalic" title="italic"><i>I</i></li>
                    <li class="markListItem leave" @click="addStrikethrough" title="strikethrough"><i class="fa fa-strikethrough" aria-hidden="true"></i></li>
                    <li class="markListItem leave" @click="addHTitle(1)" title="H1-title">H1</li>
                    <li class="markListItem" @click="addHTitle(2)" title="H2-title">H2</li>
                    <li class="markListItem" @click="addHTitle(3)" title="H3-title">H3</li>
                    <li class="markListItem" @click="addHTitle(4)" title="H4-title">H4</li>
                    <li class="markListItem" @click="addHTitle(5)" title="H5-title">H5</li>
                    <li class="markListItem" @click="addHTitle(6)" title="H6-title">H6</li>
                    <li class="markListItem leave" @click="addLine" title="line">一</li>
                    <li class="markListItem" @click="addQuote" title="quote"><i class="fa fa-quote-left" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addCode"><i class="fa fa-code" aria-hidden="true"></i></li>
                    <!--<li class="markListItem" @click="addLink"><i class="fa fa-link" aria-hidden="true"></i></li>-->
                    <!--<li class="markListItem" @click="addImage"><i class="fa fa-picture-o" aria-hidden="true"></i></li>-->
                    <li class="markListItem" @click="addTable" title="table"><i class="fa fa-table" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addUl" title="ul-list"><i class="fa fa-list-ul" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="addOl" title="ol-list"><i class="fa fa-list-ol" aria-hidden="true"></i></li>
                    <!--<li class="markListItem" @click="fullPageFn" title="fullpage"><i class="fa fa-arrows-alt" aria-hidden="true"></i></li>-->
                    <li class="markListItem" @click="previewFn" title="preview"><i class="fa fa-eye-slash" aria-hidden="true"></i></li>
                    <li class="markListItem" @click="previewAllFn" title="previewAll"><i class="fa fa-eye" aria-hidden="true"></i></li>
                    <!--自己加的-->
                    <li @click='submitReply()' v-if='is_reply_topic' class='button button-action button-pill button-small leave' style='font-size:14px;'>回复</li>
                    <li @click='submitTopic()' v-if='!is_reply_topic' class='button button-action button-pill button-small leave' style='font-size:14px;'>提交</li>
                </ul>
    
            </div>
        </div>
        <div class="mdBodyContainer" :class="{ noMenu: !navStatus }">
            <div class="editContainer" v-if="editStatus">
                <textarea name="" v-if='!this.$route.params.topic_id' class="mdEditor" @keydown.9="tabFn" v-scroll="editScroll" v-model="input"></textarea>
                <textarea name="" v-if='this.$route.params.topic_id' class="mdEditor" @keydown.9="tabFn" v-scroll="editScroll" v-model="input_editor"></textarea>
            </div>
            <div class="previewContainer markdown-body" v-scroll="previewScroll" v-html="compiledMarkdown" v-if="previewStatus">
            </div>
        </div>
    </div>
</template>

<script>
    //html转markdown格式
    //import h2m from 'h2m' ie下这个报错
    //import h2m from 'html2markdown'
    import {mapState} from 'vuex'
    import Vue from 'vue'
    import marked from 'marked'
    import scroll from 'vue-scroll'
    import hljs from '../../../static/js/highlight.min.js'
    import * as range from '../../../static/js/rangeFn.js'
    Vue.use(scroll)
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    });
    
    function insertContent(val, that) {
        let textareaDom = document.querySelector('.mdEditor');
        let value = textareaDom.value;
        let point = range.getCursortPosition(textareaDom);
        let lastChart = value.substring(point - 1, point);
        let lastFourCharts = value.substring(point - 4, point);
        if (lastChart != '\n' && value != '' && lastFourCharts != '    ') {
            val = '\n' + val;
            range.insertAfterText(textareaDom, val);
        } else {
            range.insertAfterText(textareaDom, val);
        }
        that.input = document.querySelector('.mdEditor').value;
    }
    export default {
        name: 'markdown',
        props: ['mdValuesP', 'fullPageStatusP', 'editStatusP', 'previewStatusP', 'navStatusP', 'icoStatusP'],
        data() {
            return {
                //进入编辑页面时内容输入框绑定的值
                input_editor:'',
                //input_num:1;
                input_temp:'',
                editStatus: Boolean(this.editStatusP),
                previewStatus: Boolean(this.previewStatusP),
                fullPageStatus: Boolean(this.fullPageStatusP),
                navStatus: Boolean(this.navStatusP),
                icoStatus: Boolean(this.icoStatusP),
                maxEditScrollHeight:0,
                maxPreviewScrollHeight:0
            }
        },
        created: function() {
            if (!this.editStatus && !this.previewStatus) {
                this.editStatus = true;
                this.previewStatus = true;
            }
            
        },
        mounted(){
          console.log('markdown de mounted');
          //进入编辑页面时 给内容输入框添加初始值
          if(this.$cookie.getCookie('t_sw')){
            //进入编辑页面的内容输入框的初始值
            //console.log('t_content','--',this.$cookie.getCookie('t_content'));
            //console.log('h2m','--',h2m(this.$cookie.getCookie('t_content')));
            var content=this.$store.state.topic.content || '';
            this.input_editor=content; 
          }  
        },
        computed: {
            input:{
                get: function () {
                  console.log('route','--',this.$route.params.topic_id);
                  var replyTemp=this.$store.state.topic.replyTemp;
                  if(replyTemp.loginname && replyTemp.input_num){
                    var obj={
                      loginname:replyTemp.loginname,
                      replyId:replyTemp.replyId,
                      input_num:0
                    }
                    this.$store.dispatch('topic_replyTemp',obj);
                    return '@'+replyTemp.loginname+' '+this.input_temp
                  }
                  else{
                    return this.input_temp
                  }
                },
                // setter
                set: function (val) {
                  
                  //console.log(val);
                  this.input_temp=val;
 
                }
            },
            //自己加的replyTemp:state=>state.topic.replyTemp
            ...mapState({
              /*input:(state)=>{
                if(state.topic.replyTemp.loginname){
                  return '@'+state.topic.replyTemp.loginname+' '
                }else{
                  return ''
                }
                
              },*/
              replyTemp:state=>state.topic.replyTemp,
              accessToken:state=>state.login.info.accessToken,
              topicId:state=>state.topic.detail.id,
              is_reply_topic:state=>state.create_topic.is_reply_topic
            }),
            //预览值
            compiledMarkdown: function() {
                var input='';
                if(this.$route.params.topic_id){
                  input=this.input_editor;
                }else{
                  input=this.input;
                }
                return marked(input, {
                    sanitize: true
                })
                //return this.input;
            }
        },
        methods: {
            //把信息存入cookie
            info_cookie(el){
              let po=$(el).offsetTop;
              //$('html,body').animate({scrollTop:320}, 800);
              cookie.setCookie('fullPath',this.$route.fullPath,10*60*1000);
              cookie.setCookie('po',po,10*60*1000);
              cookie.setCookie('allow_jump',1,10*60*1000);
            },
            //自己加de---提交
            submitTopic(){
              var info=this.$store.state.create_topic.info;
              //console.log('info.tab','---',info);
              var input='';
              if(this.$route.params.topic_id){
                //进入编辑页面
                
                  input=this.input_editor;
                
              }else{
                  input=this.input;
              }
              //是否能提交
              if(info.tab=='请选择'){
                console.log('tab inside');
                this.$store.dispatch('message_show',true);
                this.$store.dispatch('message_msg','请选择话题类型');
                return;
              }
              if(info.title.length<10){
                this.$store.dispatch('message_show',true);
                this.$store.dispatch('message_msg','标题长度不能小于10个字');
                return;
              }
              if(input==''){
                this.$store.dispatch('message_show',true);
                this.$store.dispatch('message_msg','内容不能为空');
                return;
              }
              var obj={};
              var url='';
              if(this.$route.params.topic_id){
                //进入编辑页面
                obj={
                  accesstoken:this.accessToken,
                  title:info.title,
                  tab:info.tab,
                  content:input,
                  topic_id:this.$route.params.topic_id
                }
                url='https://cnodejs.org/api/v1/topics/update';
              }else{
                obj={
                  accesstoken:this.accessToken,
                  title:info.title,
                  tab:info.tab,
                  content:input
                }
                url='https://cnodejs.org/api/v1/topics';
              }
              
              this.$axios.post(url,{
                ...obj
              })
              .then((res)=>{
                console.log('publish-topic-Data','---',res.data);
                //清空input
                //this.input='';
                this.$router.push({ name: 'topic', params: {id:res.data.topic_id}})
              })
              .catch(function (error) {
                console.log('回复','---',error);
                //调用提示信息
              });
            },
            //回复
            submitReply(){
              //console.log('this','---',this);
              //console.log('this.replyTemp','---',this.replyTemp);
              var obj={};
              /*var content=marked(this.input, {
                              sanitize: true
                          });
              //console.log('content','---',content);
              //content=`<div class="markdown-text">${content}↵</div>`;*/    
              if(this.replyTemp.replyId){
                obj={
                  accesstoken:this.accessToken,
                  content:this.input,
                  reply_id:this.replyTemp.replyId
                }
              }else{
                obj={
                  accesstoken:this.accessToken,
                  content:this.input
                }
              }
              this.$axios.post(`https://cnodejs.org/api/v1/topic/${this.topicId}/replies` ,{
                ...obj
              })
              .then((res)=>{
                console.log('upsData','---',res.data);
                //清空input
                this.input='';
                //请求临时数据
                this.$store.dispatch('topic_replyTemp',{});
                this.$axios.get('https://cnodejs.org/api/v1/topic/'+this.topicId)
                .then((res)=>{
                  console.log('主题','---',res);
                  this.$store.dispatch('topic_setter',res.data.data);2018/7/9
                })
              })
              .catch(function (error) {
                console.log('回复','---',error);
                //调用提示信息
              });
            },
            tabFn: function(evt) {
                insertContent("    ", this);
                // 屏蔽屌tab切换事件
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            },
            addImage: function(evt) {
                insertContent("![Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addHTitle: function(index) {
                let tmp = '';
                switch (index) {
                    case 1:
                        tmp = '# ';
                        break;
                    case 2:
                        tmp = '## ';
                        break;
                    case 3:
                        tmp = '### ';
                        break;
                    case 4:
                        tmp = '#### ';
                        break;
                    case 5:
                        tmp = '##### ';
                        break;
                    case 6:
                        tmp = '###### ';
                        break;
                    default:
                        break;
                }
                insertContent(tmp, this);
            },
            addCode: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('```\n\n```', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 5);
                } else {
                    range.setCaretPosition(textareaDom, point + 4);
                }
            },
            addStrikethrough: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('~~~~', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('****', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addItalic: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('**', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 2);
                } else {
                    range.setCaretPosition(textareaDom, point + 1);
                }
            },
            setStrong: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let point = range.getCursortPosition(textareaDom);
            },
            addLine: function() {
                insertContent('\n----\n', this);
            },
            addLink: function() {
                insertContent("[Vue](https://cn.vuejs.org/images/logo.png)", this);
            },
            addQuote: function() {
                let textareaDom = document.querySelector('.mdEditor');
                let value = textareaDom.value;
                let point = range.getCursortPosition(textareaDom);
                let lastChart = value.substring(point - 1, point);
                insertContent('> ', this);
                if (lastChart != '\n' && value != '') {
                    range.setCaretPosition(textareaDom, point + 3);
                } else {
                    range.setCaretPosition(textareaDom, point + 2);
                }
            },
            addTable: function() {
                insertContent('\nheader 1 | header 2\n', this);
                insertContent('---|---\n', this);
                insertContent('row 1 col 1 | row 1 col 2\n', this);
                insertContent('row 2 col 1 | row 2 col 2\n\n', this);
            },
            addUl: function() {
                insertContent('* ', this);
            },
            addOl: function() {
                insertContent('1. ', this);
            },
            previewFn: function() {
                if (!this.editStatus) {
                    this.editStatus = true;
                    this.previewStatus = !this.previewStatus;
                } else {
                    this.previewStatus = !this.previewStatus;
                }
            },
            previewAllFn: function() {
                if (!this.editStatus && this.previewStatus) {
                    this.editStatus = true;
                    this.previewStatus = true;
                } else {
                    this.editStatus = false;
                    this.previewStatus = true;
                }
            },
            fullPageFn: function() {
                this.fullPageStatus = !this.fullPageStatus;
                let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
                let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
                this.maxEditScrollHeight = maxEditScrollHeight
                this.maxPreviewScrollHeight = maxPreviewScrollHeight
            },
            previewScroll: function(e, position) {
                if(this.maxEditScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxPreviewScrollHeight;
                    document.querySelector('.mdEditor').scrollTop = this.maxEditScrollHeight*topPercent;
                }
            },
            editScroll:function(e, position){
                if(this.maxPreviewScrollHeight!==0){
                    let topPercent=position.scrollTop/this.maxEditScrollHeight;
                    document.querySelector('.previewContainer').scrollTop = this.maxPreviewScrollHeight*topPercent;
                }
            },
            happyDay:function(){
                window.open('https://github.com/ovenslove/vue-mdEditor');
            }
        },
     
        watch: {
            input: function() {
                let data = {};
                data.mdValue = this.input;
                //输入的数据html化
                data.htmlValue = marked(this.input, {
                    sanitize: true
                });
                this.$emit('childevent', data);
                let maxEditScrollHeight=document.querySelector('.mdEditor').scrollHeight-document.querySelector('.mdEditor').clientHeight;
                let maxPreviewScrollHeight=document.querySelector('.previewContainer').scrollHeight-document.querySelector('.previewContainer').clientHeight;
                this.maxEditScrollHeight = maxEditScrollHeight
                this.maxPreviewScrollHeight = maxPreviewScrollHeight
            }
        }
    }
</script>

<style lang="scss">
    /*引入reset文件*/
    @import "../../assets/css/font-awesome.min.css";
    @import "../../../static/css/reset";
    
    /*引入github的markdown样式文件*/
    
    @import "../../../static/css/github-markdown.css";
    
    /*引入atom的代码高亮样式文件*/
    
    @import "../../../static/css/atom-one-dark.min.css";
    .mdContainer {
        width: 100%;
        height: 300px;
        background: lightblue;
        &.fullPage {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
        }
        .navContainer {
            width: 100%;
            height: 36px;
            background: #fff;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 10px;
            .nameContainer {
                color: lightblue;
                margin-right: 10px;
                cursor:pointer;
            }
            .markContainer {
                width: auto;
                height: 100%;
                margin-left: 0px;
                ul.markListGroup {
                    height: 100%;
                    width: auto;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li.markListItem {
                        list-style: none;
                        width: 20px;
                        height: 20px;
                        margin: 0 2px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        font-size: 12px;
                        color: #333;
                        &:hover {
                            background: #eee;
                        }
                    }
                }
            }
        }
        .mdBodyContainer {
            width: 100%;
            height: calc(100% - 36px);
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            &.noMenu{
                height: 100%;
            }
        }
    }
    
    // 编辑区域
    .editContainer {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border-right: 1px solid #ddd;
        background: #333;
        color: #fff;
        padding: 10px;
        .mdEditor {
            height: 100%;
            width: 100%;
            background: transparent;
            outline: none;
            color: #fff;
            resize: none;
        }
    }
    
    // 预览区
    .previewContainer {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        padding: 10px;
    }
    //自己加的
    @media screen and (max-width:767px){
      #markListGroup li:not(.leave){
        display:none;
      }
      .previewContainer{
        display:none;
      }
      
    }
    @media screen and (max-width:380px){
      .nameContainer{
        display:none;
      }
    }
</style>