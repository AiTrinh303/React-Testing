import {http, HttpResponse} from 'msw';
import { products } from './data';


export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json(products)
    }),

    http.get('/products', () => {
        return HttpResponse.json()
    }),  

    http.get('/products/:id', ({params}) => {
        const {id} = params;
        const 
    })
];