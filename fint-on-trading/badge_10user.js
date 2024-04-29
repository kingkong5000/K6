import http from 'k6/http'
import { check } from 'k6'

const iteration = 10
const user_id = [247235, 222426, 257766, 256664, 256828]
let count = 0
export const options = {
  vus: 1,
  duration: '60s',
  iterations: iteration,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1700'] // 95% of requests should be below 1.7 sec
  }
}

export default function () {
  const url = 'http://10.4.31.240/campaign-service/private/api/v2/fint-cashback/user/order-summary'

  const header = {
    headers: {
      'Content-Type': 'application/json',
      'Finno-User-ID': user_id[count]
    }
  }

  const res = http.get(url, header)
  console.log(res)

  if (count < iteration / user_id.length) {
    count++
  } else {
    count = 0
  }

  check(res, {
    'Status is 200': (r) => r.status == 200,
    'Message is correct': (r) => r.json().status == true,
    'Message is correct': (r) => r.json().data.badge.topic != 'เปิดใช้งาน FINT Wallet',
    'Body is not Empty': (r) => r.body.length != 0
  })
}
