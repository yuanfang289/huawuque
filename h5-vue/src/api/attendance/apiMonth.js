/**
 * Created by 87402 on 2019/2/26.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option,userId) {
  return ajax(`https://attendance.urwork.cn/attendanceDaily/userDailyDetailOfCalender`, {
    data:option,
    headers:{userId:userId},
    type:'get',
    dataType:'json',
    processData:true
  })
}
