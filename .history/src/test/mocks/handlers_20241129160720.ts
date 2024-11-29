import {http, HttpResponse} from 'msw';


const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json
    })
];