import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import BrowseProducts from '../../pages/BrowseProductsPage'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse, delay } from 'msw';
// import { setupServer } from 'msw/node';
import { Theme } from '@radix-ui/themes';
import { server } from '../mocks/server';


//1. Loading State
//2. Error State
//3. Data Rendered

// const products = [
//     { id: 1, name: 'Product 1', price: 100 },
//     { id: 2, name: 'Product 2', price: 200 },
//     { id: 3, name: 'Product 3', price: 300 },
// ];

// const categories = [
//     { id: 1, name: 'Category 1' },
//     { id: 2, name: 'Category 2' },
//     { id: 3, name: 'Category 3' },
// ];

// //1. Loading State
// const handlers = [
//     http.get('/categories', () => {
//         return HttpResponse.json(categories)
//     }),

//     http.get('/products', () => {
//         return HttpResponse.json(products)
//     }),

//     http.get('/products/:id', ({params}) => {
//         const {id} = params;
//         const product = products.find(product => product.id === Number(id));
//         if (!product){
//             return new HttpResponse(null, {status: 404});            
//         }
//         return HttpResponse.json(product);
//     }),

//     http.get('/categories/:id', ({params}) => {
//         const {id} = params;
//         const categoryProducts = categories.filter(category => category.id === Number(id));
//         if (!categoryProducts){
//             return new HttpResponse(null, {status: 404});            
//         }
//         return HttpResponse.json(categoryProducts);
//     })
// ];

// const server = setupServer(...handlers);



describe('BrowseProductsPage', () => {

   it('should show loading skeleton when fetching categories',() => {
    server.use(http.get('/categories', async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
    renderComponent();

    const skeleton = screen.getByRole('progressbar', {name: /loading/i});
    expect(skeleton).toBeInTheDocument();
   })

   it('should hire the loading skeleton after categories are fetched', async() => {
    renderComponent();
    screen.getByRole('progressbar', {name: /loading/i});

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar', {name: /loading/i}));    
   })

   it


})

