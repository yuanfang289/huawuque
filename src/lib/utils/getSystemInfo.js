import getSystemInfo from "vendor/systemInfo/systemInfo";

export default function install(Vue) {
  // 获取客户端信息
  Vue.prototype.$systemInfo = getSystemInfo;
  Vue.prototype.timeSvg=(t)=>{
    let ret='';
    for(let i=0;i<t.length;i++){
      if(i==2){
        ret=ret+'<img height="20px" src="https://assets.urwork.cn/image/v3/fonts/colon.svg"/>';
      }else{
        ret=ret+'<img height="20px" src="https://assets.urwork.cn/image/v3/fonts/'+t[i]+'.svg"/>';
      }

    }
    return ret;
  }
}
