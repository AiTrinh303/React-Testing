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
import { simulateDelay, simulateError } from '../utils';


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

    // beforeAll(() => {
    //     [1,2].forEach((item) => {
    //         categories.push(db.category.create({name: 'Category ' + item}));
    //         products.push(db.product.create());
    //     })
    // })

    beforeAll(() => {
        [1,2].forEach(() => {
            const category = db.category.create();
            categories.push(category));
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
        return {
            getProductsSkeleton: () => screen.getByRole('progressbar', {name: /products/i}),
            getCategoriesSkeleton: () => screen.getByRole('progressbar', {name: /categories/i})
        }
    }
//1. TESTING LOADING STATE
   it('should show loading skeleton when fetching categories',() => {
    // server.use(http.get('/categories', async() => {
    //     await delay ();
    //     return HttpResponse.json([]);
    // }))
    simulateDelay('/categories');
    const {getCategoriesSkeleton} = renderComponent();

    // const skeleton = screen.getByRole('progressbar', {name: /categories/i});
    expect(getCategoriesSkeleton()).toBeInTheDocument();
   })

   it('should hire the loading skeleton after categories are fetched', async() => {
    const {getCategoriesSkeleton} = renderComponent();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await waitForElementToBeRemoved(getCategoriesSkeleton);    
   })

   it('should show loading skeleton when fetching products', () => {
    // server.use(http.get('/products', async() => {
    //     await delay ();
    //     return HttpResponse.json([]);
    // }))
    simulateDelay('/products');
    const {getProductsSkeleton} = renderComponent();

    // const skeleton = screen.getByRole('progressbar', {name: /products/i});
    expect(getProductsSkeleton()).toBeInTheDocument();
   })

   it('should hire the loading skeleton after products are fetched', async() => {
    const {getProductsSkeleton} = renderComponent();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await waitForElementToBeRemoved(getProductsSkeleton);    
   })


//2. TESTING ERROR STATE 
   it('should not render error but not display categories if categories cannot be fetched', async() => {
        // server.use(http.get('/categories', () => HttpResponse.error()));
        simulateError('/categories');
        const {getProductsSkeleton} = renderComponent();
        await waitForElementToBeRemoved(getProductsSkeleton);
        const errorMessage = screen.queryByText(/Error:/i);
        expect(errorMessage).not.toBeInTheDocument();
       const box = screen.queryByRole('combobox', {name: /category/i});
        expect(box).not.toBeInTheDocument();
   })

   it('should render error if products cannot be fetched ', async() => {
    // server.use(http.get('/products', () => HttpResponse.error()));
    simulateError('/products');
    renderComponent();
    const errorMessage = await screen.findByText(/Error:/i);
    expect(errorMessage).toBeInTheDocument();    
   })

//3. TESTING DATA RENDERED
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

   it('should render list of products', async() => {
    const {getProductsSkeleton} = renderComponent();

    await waitForElementToBeRemoved(getProductsSkeleton);

    products.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
    })    
   });

//4. TESTING FILTERING
   it('should filter products by category', async() => {
    const {getCategoriesSkeleton} = renderComponent();
    //Arrange
    await waitForElementToBeRemoved(getCategoriesSkeleton);
    const combobox = await screen.findByRole('combobox');
    const user = userEvent.setup(); 
    await user.click(combobox);

    //Act
    const option = await screen.findByRole('option', {name: categories[0].name});
    await user.click(option);

    //Assert

   })

})

