// import {http, HttpResponse} from 'msw';
import { products } from './data';
import { db } from './db';


export const handlers = [
    ...db.product.toHandlers('rest'),

    // http.get('/categories', () => {
    //     return HttpResponse.json(products)
    // }),

    // http.get('/products', () => {
    //     return HttpResponse.json(products)
    // }),  

    // http.get('/products/:id', ({params}) => {
    //     const {id} = params;
    //     const product = products.find(product => product.id === Number(id));
    //     if (!product){
    //         return new HttpResponse(null, {status: 404});            
    //     }
    //     return HttpResponse.json(product);
    // })
];