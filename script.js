import http from 'k6/http'; // import http module from k6/http 
import { check, sleep } from 'k6'; // import check function from k6 for checking API Response , Sleep for 
import {Rate} from 'k6/metric' // import check module from k6/metric 

export const errorRate = new Rate('error')


// Declare Configuration //
export const options = {

    thresholds : {
        error : ['rate < 0.1'] // Set erorr rate should less thant 10% if error rate are more than 10 this testcase might be failed
      },
    

  vus : 10, // 10 Virtual Users//
  duration : '10s', // Time period of this script running 
  iteration : 20, // Number of Request Per Vu 



// Ramp up n Down , Usually Create Test case here //
   stages: [
    { duration: '30s', target: 20 }, // 20 users for 30s , target = number of vu 
    { duration: '1m30s', target: 10 }, 
    { duration: '20s', target: 1 },
  ], 

};

export default function () {
  const res = http.get('https://run.mocky.io/v3/7449cdfb-975a-48df-93fc-5de6873c1a19'); // Declare res variable for recieve response from httpbin.test.k6.io 
  const checkRate = check(res, {
     'status was 200': (r) => r.status == 200,  // Expected that API Response code must be 200 
     'body size is 0 byte' : (r) => r.body.length == 0 // Expect that API Response body might contain nothing 
    });
  errorRate.add(!checkRate); // Record error rate from response if that Res status !=200 or length !=0
}
