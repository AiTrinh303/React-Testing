// import {http, HttpResponse} from 'msw';
// import { products } from './data';
import { db } from './db';

// const products = [
//     { id: 1, name: 'Product 1', price: 100 },
//     { id: 2, name: 'Product 2', price: 200 },
//     { id: 3, name: 'Product 3', price: 300 },
// ];


export const handlers = [
    ...db.product.toHandlers,

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