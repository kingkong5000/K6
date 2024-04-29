import http from 'k6/http';
import {check} from 'k6'
import { sleep } from 'k6';

// export let options = {
//     scenarios: {
//         foo: {
//             executor: 'shared-iterations',
//             vus: 10,
//             iterations:10000,
//             maxDuration: '1m',
//             exec: 'firstScenario'
//         },
//     },
// };

export const options = {
    stages: [
      {  duration: '10s', target: 100 },
      { duration: '30s', target: 300 },
      { duration: '10s', target: 800 },
      { duration: '1m', target: 800 },
      { duration: '10s', target: 300 },
      { duration: '30s', target: 100 }
    ],
  };

export default function () { 
    const url = 'https://api-qa.finnomena.com/registrar-service-external/private/api/v1/customer/public-profile'

    const header = {
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearrer rlhKt7iNV0IjDPQ89-69pGKLU4NPpiq1EMgXPQKTgmI.P5DCT8mgI6mkOxdZQGzu2C3I6arGbmX7l8lMc1YRJpk'
        }
    }

    const res = http.get(url,header)

    // check(res,{
    //     'Status is 200' : () => r.status == 200
    //     //'Message is correct' : (r) => r.body.message.indexOf == ('Save notification to hub success')
    // })
	//sleep(1);
}

