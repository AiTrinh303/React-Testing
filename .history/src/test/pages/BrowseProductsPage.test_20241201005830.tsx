import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import BrowseProducts from '../../pages/BrowseProductsPage'
import { http, HttpResponse, delay } from 'msw';
// import { setupServer } from 'msw/node';
import { Theme } from '@radix-ui/themes';
import { server } from '../mocks/server';
import userEvent from '@testing-library/user-event';
import { db } from '../mocks/db';
import { Category, Product } from '../../entities';
import { CartProvider } from '../../providers/CartProvider';


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
    const categories: Category[] = [];
    const products: Product[] = [];

    beforeAll(() => {
        [1,2].forEach(() => {
            categories.push(db.category.create());
            products.push(db.product.create());
        })
    })
    
    afterAll(() => {
        const categoryIds = categories.map(c => c.id);
        db.category.deleteMany({where: {id: {in: categoryIds}}});

        const productIds = products.map(p => p.id);
        db.product.deleteMany({where: {id: {in: productIds}}});
    })

    const renderComponent = () => {
        render (
           <CartProvider>
                <Theme>
                    <BrowseProducts />
                </Theme>
           </CartProvider>
        )
    }
//1. Loading State with skeleton categories and products
   it('should show loading skeleton when fetching categories',() => {
    server.use(http.get('/categories', async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
    renderComponent();

    const skeleton = screen.getByRole('progressbar', {name: /categories/i});
    expect(skeleton).toBeInTheDocument();
   })

   it('should hire the loading skeleton after categories are fetched', async() => {
    renderComponent();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar', {name: / categories/i}));    
   })

   it('should show loading skeleton when fetching products', () => {
    server.use(http.get('/products', async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
    renderComponent();

    const skeleton = screen.getByRole('progressbar', {name: /products/i});
    expect(skeleton).toBeInTheDocument();
   })

   it('should hire the loading skeleton after products are fetched', async() => {
    renderComponent();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar', {name: / products/i}));    
   })


//2. Error State   
   it('should not render error but not display categories if categories cannot be fetched', async() => {
        server.use(http.get('/categories', () => HttpResponse.error()));
        renderComponent();
        await waitForElementToBeRemoved(() => screen.queryByRole('progressbar', {name: /categories/i}));
        const errorMessage = screen.queryByText(/Error:/i);
        expect(errorMessage).not.toBeInTheDocument();
       const box = screen.queryByRole('combobox', {name: /category/i});
        expect(box).not.toBeInTheDocument();
   })

   it('should render error if products cannot be fetched ', async() => {
    server.use(http.get('/products', () => HttpResponse.error()));
    renderComponent();
    const errorMessage = await screen.findByText(/Error:/i);
    expect(errorMessage).toBeInTheDocument();    
   })

//3. Data Rendered
   it('should render list of categories', async () => {
    renderComponent();

    const combobox = await screen.findByRole('combobox');
    expect(combobox).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(combobox);

    const options = await screen.findAllByRole('option');

    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toHaveTextContent(/all/i);
    categories.forEach(category => {
        expect(screen.getByRole('option', {name: category.name})).toBeInTheDocument();
    })
   })

   it('should render list of products', () => {
    renderComponent();

    products.forEach((product) => {
        expect(await screen.findByText(product.name)).toBeInTheDocument();
    })
    
   });

})

