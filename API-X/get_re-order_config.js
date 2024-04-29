import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

export const errorRate = new Rate('error')
export const options = {
  thresholds: {
    error: ['rate < 0.1']
  },
  scenarios: {
    Average1: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 10,
      maxDuration: '10s'
    },
    spike: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 50,
      startRate: 10,
      timeUnit: '10s',
      startTime: '10s',
      stages: [
        { target: 10, duration: '10s' },
        { target: 11, duration: '10s' },
        { target: 12, duration: '10s' },
        { target: 13, duration: '10s' }
      ]
    },
    Average2: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 50,
      startRate: 10,
      timeUnit: '10s',
      startTime: '50s',
      stages: [
        { target: 10, duration: '10s' },
        { target: 11, duration: '10s' },
        { target: 12, duration: '10s' },
        { target: 13, duration: '10s' }
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
  errorRate.add(!checkRate) // Record error rate from response if response.status !=200 or status != true
}