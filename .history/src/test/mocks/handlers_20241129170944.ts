import {http, HttpResponse} from 'msw';
import { products } from './data';


export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json(products)
    }),

    http.get('/products', () => {
        return HttpResponse.json([
            {id: 1, name: 'Product 1'},
            {id: 2, name: 'Product 2'},
            {id: 3, name: 'Product 3'},
        ])
    }),  

    http.get('/products/:id', ({params}) => {
        const {id} = params;
        const 
    })
];