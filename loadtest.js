import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {
//     // vum: 300,
//     // duration: '2m'
//    
//     stages: [
//         { target: 200, duration: '30s' },
//         { target: 0, duration: '30s' },
//     ],
// };
//
// export default function () {
//     const result = http.get('http://hobbyhub.com/api/h/users');
//     check(result, {
//         'http response status code is 200': result.status === 200,
//     });
// }

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    scenarios: {
        loadtest_hobbyhub_1000: {
            executor: 'constant-arrival-rate',
            duration: '1m', // total duration
            preAllocatedVUs: 1000, // to allocate runtime resources

            rate: 1000, // number of constant iterations given `timeUnit`
            timeUnit: '1s',
        },
    },
};


export default function () {
    const url = 'http://hobbyhub.com/api/h/users';
    const response = http.get(url);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });
    
    sleep(1); 
}

//Version with Authentication:
// export default function () {
//     const url = 'http://hobbyhub.com/api/h/users';
//     const headers = {
//         Authorization: 'Bearer YOUR_API_TOKEN', // Replace with your actual token
//         'Content-Type': 'application/json',
//     };
//
//     const response = http.get(url, { headers });
//     check(response, {
//         'status is 200': (r) => r.status === 200,
//     });
//    
//     if (response.status !== 200) {
//         console.error(`Unexpected status code: ${response.status}`);
//         console.error(`Response body: ${response.body}`);
//     }
//     sleep(1);
// }
