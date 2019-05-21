/**
 * Created by xiezy on 2019/2/27.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option,userid) {
  return ajax(`https://attendance.urwork.cn/attendanceMonthly/calListByType`, {
    data:option,
    type:'get',
    contentType:'json',
    headers: {userId: userid}
  },1)
}
