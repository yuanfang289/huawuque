const NODE_ENV = process.env.NODE_ENV
const PROD = NODE_ENV === 'production'
const TEST = NODE_ENV === 'test'
const DEV = NODE_ENV === 'dev'
const DEBUG = NODE_ENV === 'debug'
const MOCK = NODE_ENV === 'mock'

let requestUrl = ''
let requestDomain = ''

const requestPath = module.hot ? '/api' : ''

const mockUrl = 'https://www.easy-mock.com/mock/5b836af859551105dc06f5e1/rent/rent'
const devDomain = 'http://m.urwork.cn'
const debugDomain = 'http://m.urwork.cn'
const testDomain = 'api.test.alwaysnb.com'
const prodDomain = 'api.alwaysnb.com'
if (PROD) {
  requestDomain = prodDomain
}
if (TEST) {
  requestDomain = testDomain
}

requestUrl = MOCK ? mockUrl : requestDomain + requestPath

const env = {
  PROD,
  TEST,
  DEV,
  MOCK,
  DEBUG
}

const domains = {
  devDomain,
  testDomain,
  prodDomain,
  debugDomain,
  mockUrl
}

const domain = requestDomain
module.exports = {
  requestUrl,
  env,
  domains,
  domain
}
