import http from 'k6/http'
import {check} from 'k6'
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

//import { SharedArray } from 'k6/data'


/*const users = new SharedArray('users', function (){
  return JSON.parse(open('./user_id.json'));
})*/


export const options = {
  scenarios: {
    contacs: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages:[
          {duration: '10s', target: 100},
          {duration: '30s', target: 300}
        ]
    },
},
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'] // 95% of requests should be below 2 sec
  }
}
/*export function loopUser(){
  for (let i=0; i<users.length ; i++){
    data.push({});
    users(i);
  }
  return data;
}*/
  
export default function (){
   const url = 'https://finno-nds-pusher-service-7f64glsaza-as.a.run.app/api/v1/hub/webhook'
    
    const header = {
        headers:{
            'Content-Type' : 'application/json',
            'X-API-Key' : "ruj9Jv'c]tzv'grnjvo"
        }
    }

    // function() ที่จะ loop ดึงค่าและส่งค่าให้ตัวแปรนึง เพื่อเอาไปแสดงค่าที่ user_id

    const payload = JSON.stringify(
        {
            "user_id": "228097",
            "external_id": "e141f110-bf31-4900-8c99-155d33b9f916",
            "notification_topic": "[news] Test Duplicate - 13 Sep #2",
            "notification_desc": "Test K6 Random shot",
            "notification_cate": "news",
            "notification_sub_cate" : "promotion",
            "img_url": "icon-noti-news.png",
            "web_url": "https://finnomena.com/012304",
            "navigate": "cart",
            "agent_account_id": "888888888888",
            "url": "https://www.finnomena.com",
            "active": "watchlist"
        }
    )
        

    const res = http.post(url,payload,header)
    //console.log(res)
    
    check(res,{
        'Status is 200' : (r) => r.status == 200
        //'Message is correct' : (r) => r.body.message.indexOf == ('Save notification to hub success')
    })
   
}

