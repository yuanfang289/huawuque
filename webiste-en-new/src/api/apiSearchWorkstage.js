import ajax from '@/utils/ajax'

export default function (data) {
  return ajax(`/api/workstage/searceByName`, {
    data,
    catchRes: false
  })
}
