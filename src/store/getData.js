//��ҳ����������ݵĺ���

var all={
  all(state){
      //var limit=40;
      var that=this;
      $.ajax({
        method:'get',
	    url:'https://cnodejs.org/api/v1/topics',
	    async:false,
	    success:function(data){
	      //console.log('data','---',data);
	      state.topic=data.data;
	      //that.$store.commit('r_topic',data.data);
	      //that.topic[0].last_reply_img='kkk';
	      console.log('topic','---',state.topic);
	    },
	    error:function(xml,err){
	      state.req_data=false;
	      console.log('�������','---',xml);
	      console.log('����','---',err);
	    }
      });
  }
}

export default{
  
}