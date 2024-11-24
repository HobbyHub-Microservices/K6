import http from 'k6/http';
import { check } from 'k6';

export const options = {
    // vum: 300,
    // duration: '2m'
    
    stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
    ],
};

export default function () {
    const result = http.get('http://hobbyhub.com/api/h/users');
    check(result, {
        'http response status code is 200': result.status === 200,
    });
}