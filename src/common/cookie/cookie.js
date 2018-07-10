export function setCookie(name,val,extime){
 //这里的时间单位为毫秒
  var expires=new Date(new Date().getTime()+extime).toGMTString();
  if(extime){
    document.cookie=`${name}=${val};expires=${expires}`  
  }else{
    //console.log('设置临时cookie');
    document.cookie=`${name}=${val}` 
  }
  
}
//存一组cookie
export function setCookieAll(json){
  
}
export function getCookie(name){
  //console.log('取cookie');
  //console.log('cookie','---',document.cookie);
  var ary=document.cookie.split(';');
  //console.log('ary','---',ary);
  var res='';
  var temp=[];
  ary.forEach((val,index)=>{
    temp=val.split('=');
    //.log('temp[0]','---',temp[0]);
    //console.log('name','---',name);
	  //obj[temp[0]]=temp[1];
    //cookie除第一个键值,时以后的键值对有一个空格
    if($.trim(temp[0])==name){
      //console.log('jin','--',name);
      res=temp[1];
      return;
    }
  });
  //console.log('res','---',res);
  return res;
}
export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
}