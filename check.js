
import http from 'k6/http'; // import http module from k6/http 
import { check, sleep } from 'k6'; // import check function from k6 for checking API Response , Sleep for 
import {Rate} from 'k6/metrics' // import check module from k6/metric 

export const errorRate = new Rate('error')


// Declare Configuration //
export const options = {

    thresholds : {
        error : ['rate < 0.1'] // Set erorr rate should less thant 10% if error rate are more than 10 this testcase might be failed
      },
    }    

export default function () {

const res = http.get('https://run.mocky.io/v3/7449cdfb-975a-48df-93fc-5de6873c1a19');
console.log(`response body length'${response.length}`)
const checkRate1 = check(res, {
    'body size is 0 byte' : (r) => r.body.length == 0 // Expect that API Response body might contain nothing 
   });
errorRate.add(!checkRate1); // Record error from response if that Res status length !=0

const checkRate2 = check(res, {
    'status was 200': (r) => r.status == 200  // Expected that API Response code must be 200  
   });
errorRate.add(!checkRate2); // Record error  from response if that Res status !=200
}