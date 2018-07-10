//深度遍历
//遍历对象中所有Ur的值

function deepTraverse(obj,key)
{
    for (var a in obj) {

        if(a==key)    console.log(obj[a]);/ /显示URL的值
        if (typeof (obj[a]) == "object") {
            TraversalObject(obj[a]); //递归遍历
        }
    }
}