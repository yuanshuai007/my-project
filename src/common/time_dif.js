/*
  给定一个过去的时间和现在时间的差
*/
export default function(date){
  var past=new Date(date);
  var now=new Date();
  //console.log('past','---',past);
  //console.log('now','---',now);
  //console.log('秒差qian','---',now.getSeconds()-past.getSeconds());
  //年份差
  if(now.getFullYear()-past.getFullYear()>0){
    return `${now.getFullYear()-past.getFullYear()}年前`
	//console.log();
  }
  //月份差
  else if(now.getMonth()-past.getMonth()>0){
    return `${now.getMonth()-past.getMonth()}月前`
  }
  //天数差
  else if(now.getDate()-past.getDate()>0){
    return `${now.getDate()-past.getDate()}天前`
  }
  //时数差
  else if(now.getHours()-past.getHours()>0){
    return `${now.getHours()-past.getHours()}小时前`
  }
  //分数差
  else if(now.getMinutes()-past.getMinutes()>0){
    return `${now.getMinutes()-past.getMinutes()}分钟前`
  }
  //秒数差
  else{
    return '几秒前'
  }
  /*if(now.getSeconds()-past.getSeconds()>0){
	console.log('秒差','---',now.getSeconds()-past.getSeconds());
    return `${now.getSeconds()-past.getSeconds()}秒前`
  }*/
}