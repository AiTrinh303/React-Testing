import {http, HttpResponse} from 'msw';
import { products } from './data';


export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json(products)
    }),

    http.get('/products', () => {
        return HttpResponse.json(products)
    }),  

    http.get('/products/:id', ({params}) => {
        const {id} = params;
        const product = products.find(product => product.id === Number(id));
        if (!product){
            return new HttpResponse(null, {status})
        }

    })
];