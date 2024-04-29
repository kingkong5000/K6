import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metric'

export const errorRate = new Rate('error')
export const options = {
  thresholds: {
    error: ['rate < 0.1']
  },
  scenarios: {
    Average1: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      maxDuration: '1m',
      stages: [
        { target: 16000, duration: '1m' },
        { target: 18000, duration: '1m' },
        { target: 20000, duration: '1m' },
        { target: 220000, duration: '1m' }
      ]
    },
    spike: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      maxDuration: '1m',
      stages: [
        { target: 16000, duration: '1m' },
        { target: 18000, duration: '1m' },
        { target: 20000, duration: '1m' },
        { target: 220000, duration: '1m' }
      ]
    },
    Average2: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      maxDuration: '1m',
      stages: [
        { target: 16000, duration: '1m' },
        { target: 18000, duration: '1m' },
        { target: 20000, duration: '1m' },
        { target: 220000, duration: '1m' }
      ]
    }
  }
}

export default function () {
  const url = 'https://api-int.finnomena.com/cms-service/public/api/v2/app/home/config'

  const header = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = http.get(url, header)
  const checkRate = check(res, {
    'status was 200': (r) => r.status == 200,
    'Status message is correct': (r) => r.json().status == true
  })
  errorRate.add(!checkRate) // Record error rate from response if that Res status !=200 or status != true
}
