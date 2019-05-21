import ajax from '@/utils/ajax'

export default function (data) {
  return ajax(`/api/passport/getNationalCodes`, {
    data,
    catchRes: false
  })
}
