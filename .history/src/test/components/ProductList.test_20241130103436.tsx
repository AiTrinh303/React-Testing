import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ProductList from '../../components/ProductList';
import { server } from '../mocks/server';
import {http, HttpResponse, delay} from 'msw';
import { db } from '../mocks/db';

describe('ProductList', () =>{

    const productIds: number[] = [];

    beforeAll(() => {
        [1,2,3].forEach(() => {
            const product = db.product.create();
            productIds.push(product.id);
        });
    })

    afterAll(() => {
        db.product.deleteMany({where: {id: {in: productIds}}});
    })

    const renderComponent = () => 
       

    it('should render the list of products', async() => {
        render(<ProductList />);
        const items = await screen.findAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
    })

    it('should render no products available if no product is found',async () => {
        server.use(http.get('/products', () => HttpResponse.json([])));
        render(<ProductList />);
        const message = await screen.findByText(/No products available./i);
        expect(message).toBeInTheDocument();
    })

    it('should render an error message when there is an error',async () => {
        server.use(http.get('/products', () => HttpResponse.error()));
        render(<ProductList />);
        const errorMessage =await screen.findByText(/Error:/i);
        expect(errorMessage).toBeInTheDocument();
    })

    it('should render a loading indicator when fetching data', async() => {
        server.use(http.get('/products', async() => {
            await delay ();
            return HttpResponse.json([]);
        }))

        render(<ProductList />);
        const loading = await screen.findByText(/Loading.../i);
        expect(loading).toBeInTheDocument();
    })

    it('should remove the loading indicator after data is fetched', async() => {
        render(<ProductList />);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
    })

    it('should remove the loading indicator after data fetching fails',async () => {
        server.use(http.get('/products', () => HttpResponse.error()));
        render(<ProductList />);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
    })
})