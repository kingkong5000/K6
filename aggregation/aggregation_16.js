import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '600s', target: 200 },
    { duration: '30s', target: 0 }
    // this setup is for stress test to find break point
    // { duration: '30s', target: 100 },
    // { duration: '60s', target: 100 },

    // { duration: '30s', target: 200 },
    // { duration: '60s', target: 200 },

    // { duration: '30s', target: 300 },
    // { duration: '60s', target: 300 },

    // { duration: '30s', target: 400 },
    // { duration: '60s', target: 400 },

    // { duration: '30s', target: 500 },
    // { duration: '60s', target: 500 },

    // { duration: '30s', target: 600 },
    // { duration: '60s', target: 600 },

    // { duration: '30s', target: 0 }
  ]
}

export default function () {
  const url = 'https://api-qa.finnomena.com/customer-onboarding-service/private/api/v1/customers/state'
  const header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer CGRkOOLwXfF8U74HFHvBjIOPlKkQ3DKPWUEgChWdHEk.oZbFx-moXaPSU2tkD1hvyJtDpensT-SID58asrzb3d4'
    }
  }

  const response = http.get(url, header)
  console.log(response.json())
  check(response, {
    'status is 200': (r) => r.status === 200,
    'State is ACCOUNT_REJECT': (r) => r.json().data.state == 'ACCOUNT_REJECTED'
  })
  sleep(0.3)
}
