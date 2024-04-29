import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
        foo: {
            executor: 'shared-iterations',
            vus: 10,
            iterations:100,
            maxDuration: '1m',
            exec: 'firstScenario'
        },
        bar: {
            executor: 'per-vu-iterations',
            vus:10,
            iterations:100,
            maxDuration: '1m',
            exec: 'secondScenario'
        },
    },
};

export function firstScenario() { 
	http.get('https://test.k6.io');
	sleep(1);
}
export function secondScenario() {
	http.get('https://test.k6.io');
	sleep(1);
}