import http from 'k6/http'
import {check} from 'k6'

export default function (){
    var url = 'https://run.mocky.io/v3/5a6dc51b-f097-4833-ab36-7d9d245a927c'

    var headerParam = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }

    const res = http.get(url,headerParam)

    check(res),{
        'Status is 200' : (r) => r.status == 200,
    }
}