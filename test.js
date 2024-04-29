import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '10s',
    iterations: 10
}

export default function () {
  http.get('http://test.k6.io');
}
