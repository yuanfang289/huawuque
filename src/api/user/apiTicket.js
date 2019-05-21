/**
 * Created by xiezy on 2018/12/10.
 */
import {httpgateway} from 'config/config';
import {ajax} from 'utils';
export default function(option,userid) {
    return ajax(`${httpgateway}/member-rights/rights/draw`, {
    data:option,
      async:false,
    type:'post',
    dataType:'json',
    processData:true,
      headers: {userId: userid},
      // beforeSend:function(xhr) {
      //   xhr.withCredentials = true;
      // },
    xhrFields:{withCredentials: true},
    crossDomain: true
  },1,1)
}
// export default function(option,userid) {
//   return ajax(`https://attendance.urwork.cn/attendanceDaily/deilyDetail`, {
//     data:option,
//     type:'get',
//     contentType:'json',
//     headers: {userId: userid}
//   },1)
// }
