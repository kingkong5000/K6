import http from 'k6/http'
import { check } from 'k6'

export const options = {
  vus: 10,
  duration: '5s',
  iterations: 10,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1700'] // 95% of requests should be below 1.7 sec
  }
}

export default function () {
  const url = 'https://api-int.finnomena.com/campaign-service/private/api/v2/fint-cashback/user/order-summary'

  const header = {
    headers: {
      'Content-Type': 'application/json',
      // "Finno-User-ID": 247235,
      Authorization: 'Bearer kSLloLYZtjWVwog6GGJx6gHWS2s7OB5W59QJWXvYa_s.MTGeYGIUyaNHEv6TEqwlcoohni0XXzoszESdinkbscY'
    }
  }
  const res = http.get(url, header)
  // console.log(res)
  //   console.log(res.json().status);
  //   console.log(res.status);

  check(res, {
    'Status is 200': (r) => r.status == 200,
    'Status message is correct': (r) => r.json().status == true,
    // 'Message is correct': (r) => r.json().data.badge.topic != 'เปิดใช้งาน FINT Wallet',
    'Body is not Empty': (r) => r.body.length != 0
  })
}
