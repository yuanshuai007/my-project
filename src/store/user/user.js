export default{
  state:{
    user_data:{
			avartar_url:'',
			create_at:'',
      githubUsername:'',
      loginname:'',
      recent_replies:[],
      recent_topics:[],
      score:''
		},
    is_page:false
  },
  mutations:{
    mu_user_data(state,data){
      state.user_data=data;
    },
    mu_is_page(state,data){
      state.is_page=data;
    }
  },
  actions:{
    user_data({commit},data){
      commit('mu_user_data',data);
    },
    user_is_page({commit},data){
      commit('mu_is_page',data);
    }
  }
}