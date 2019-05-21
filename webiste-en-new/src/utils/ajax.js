import axios from 'axios'
import {stringify} from 'qs'
import getLocation from '@/utils/getLocation'
/**
 *
 * @desc 参数参考 jQuery ajax
 *
 * @param {string} url                          接口地址
 * @param {object} options                      其他参数
 * @property {boolean}  options.catchRes        是否拦截返回结果，对retCode统一处理
 * @property {boolean}  options.catchFail       请是否拦截retCode异常处理，false则alert错误信息
 * @property {function} options.success         请求成功回调
 * @property {function} options.fail            请求失败回调
 * @property {function} options.complete        请求发出回调
 * @property {function} options.beforeSend      请求前的处理函数，可以在这里修改data参数
 * @property {string}   options.type            请求方式get|post等，默认get
 * @property {string}   options.contentType     设置请求头的'Content-Type'，
 *                                              可用参数{'json': 对应'application/json'}或者直接传'application/*'
 * @property {object}   options.data            请求数据
 * @property {boolean}  options.cache           是否缓存请求，默认 true[缓存]
 *
 * @returns {Promise<Response>}
 */

export default function ajax (url, options = {}) {
  console.log("process.env.REQUESTURL",process.env.REQUESTURL);
  if(process.env.REQUESTURL!==""){
    url= url.replace('/api',process.env.REQUESTURL,);
  }
  // 根据运行环境，设置接口请求protocol
  let protocol = process.env.REQUESTURL === '' ? '' : getLocation().protocol
  const success = options.success
  const complete = options.complete
  const beforeSend = options.beforeSend
  // 将参数拼接在?后边，并且以post方式请求
  const queryPost = options.queryPost === undefined ? false : options.queryPost
  const processData = options.processData === undefined ? true : options.processData
  const methods = ['put', 'post', 'patch']
  const method = options.type || 'get'
  let data = options.data || {}

  // stringify数据处理
  let indices = options.indices === undefined ? false : options.indices

  // 是否缓存请求，默认不缓存
  const cache = options.cache === undefined ? true : options.cache

  // 拦截返回结果，对retCode统一处理
  const catchRes = options.catchRes === undefined ? true : options.catchRes
  // headers设置
  options.headers = options.headers || {}
  options.contentType = options.contentType || ''

  const contentType = options.contentType.toLowerCase()
  if (contentType) {
    if (contentType === 'json') {
      options.headers['Content-Type'] = 'application/json'
    } else {
      options.headers['Content-Type'] = options.contentType
    }
  }

  // 清理选项
  delete options.url
  delete options.success
  delete options.fail
  delete options.complete
  delete options.catchFail
  delete options.transformResponse
  delete options.data
  delete options.params
  delete options.type
  delete options.beforeSend
  delete options.cache
  delete options.contentType
  delete options.processData
  delete options.catchRes
  delete options.queryPost
  delete options.indices

  // 时间戳
  const timestamp = Date.now().toString(32)

  options.method = method

  // 判断method传入值，决定参数类型[data|params]

  if (methods.indexOf(method.toLowerCase()) >= 0) {
    if (cache) {
      url += `${url.indexOf('?')>-1 ? '&' : '?'}timestamp=${timestamp}`
    }

    if (queryPost) {
      url += `${url.indexOf('?')>-1 ? '&' : '?'}${stringify(data, {indices})}`
    } else {
      options.data = contentType === 'json' ? JSON.stringify(data) : (processData ? stringify(data, {indices}) : data)
    }
  } else {
    if (cache) {
      data.timestamp = timestamp
    }
    options.params = data
  }

  // 发送前的处理
  options.transformRequest = [function (res) {
    if (typeof beforeSend === 'function') {
      return beforeSend(res)
    } else {
      return res
    }
  }]

  // then/catch 之前处理
  options.transformResponse = [function (res) {
    try {
      res = JSON.parse(res)
    } catch (e) {

    }
    typeof complete === 'function' && complete(res)
    return res
  }]

  // 跨域请求设置
  options.withCredentials = true
  return new Promise((resolve, reject) => {
    if(url.indexOf('getNationalCodes')>-1){
      url='https://passport.urwork.cn/passport/getNationalCodes';
      protocol='';
    }
    axios(protocol + url, options)
      .then(res => {
        let data = res.data || {}
        let {retCode} = data
        // 拦截返回结果，对retCode统一处理
        if (catchRes) {
          if (retCode === 0) {
            typeof success === 'function' && success(data)
            resolve(data)
            return
          } else {
            reject(data)
          }
        }
        resolve(data)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
