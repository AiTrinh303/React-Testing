import {http} from 'msw';


const handlers = [
    http.get('/categories')
    ];