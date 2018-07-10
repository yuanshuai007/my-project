export default function loading(router,store){
  router.beforeEach((to,from,next)=>{
    if(to.name=='topic'){
	  store.state.loading.isLoading=true;
	  console.log('进路由','---',store.state.loading);
	}
	next();
  });
  router.afterEach((to,from,next)=>{
      store.state.loading.isLoading=false;
	  next();
	  console.log('出路由','---',store.state.loading);
  });
}