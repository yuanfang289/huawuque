import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://m.urwork.cn/user/getCompanyListByUserId`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1,1)
}
