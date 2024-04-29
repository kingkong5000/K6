/// This file stored type of Performance testing executor 
import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    scenarios:{
        contacts: {
            executor : 'shared-iterations',
            vus: 10,
            iterations: 20000,
            maxDuration: '60s'
    }
    }
};


// Stress Testing : find the range of the break point, this test will ramps up and stay at that point for a period of time and then ramps up again
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
          executor: 'ramping-arrival-rate',
          startRate: 300,// Start iterations per `timeUnit`
          timeUnit: '1m',  // Start `startRate` iterations per minute 
          preAllocatedVUs: 50,// Pre-allocate necessary VUs.
          stages: [
            { target: 16000, duration: '1m' },// Start 300 iterations per `timeUnit` for the first minute.
            { target: 18000, duration: '1m' },
            { target: 20000, duration: '1m' },
            { target: 220000, duration: '1m' },
          ],
        },
      },
    };
  


// After we find the Breakpoint number and Capacity number , Then we continue to do Loadtest and monitoring for several stat
export const options = {
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 2500, // Number of request config here krub
        maxDuration: '60s',
      },
      stages:[

      ],
    },
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<2000'] // 95% of requests should be below 2 sec
    }
  }


// Normal Stage 
export const options = {
    stage:[
        { target: 16000, duration: '60s' },
        { target: 18000, duration: '60s' }
    ]
    }