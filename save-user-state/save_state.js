import http from 'k6/http'
import { check } from 'k6'

export const options = {
  vus: 10,
  duration: '10s',
  iterations: 15,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1700'] // 95% of requests should be below 1.7 sec
  }
}

export default function () {
  const url = 'https://api-int.finnomena.com/customer-onboarding-service/private/api/v1/customers/state'

  const header = {
    headers: {
      'Content-Type': 'application/json',
      // 'Finno-User-ID': '257641'
      Authorization: 'Bearer _XqL-VWmBVPIUewlcUNdqM89hNScc885XxHurqYo_mM.f2lr2w0g_4MhFIV6mRrLFFTSggUmVMOk4J_xpUgekQM'
    }
  }

  const res = http.post(url, header)
  console.log(res)
  //   console.log(res.json().status);
  //   console.log(res.status);

  check(res, {
    'Status is 200': (r) => r.status == 200,
    'Status message is correct': (r) => r.json().status == true
  })
}
