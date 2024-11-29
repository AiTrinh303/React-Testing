import { render, screen } from '@testing-library/react';
import ProductList from '../../components/ProductList';
import { server } from '../mocks/server';
import {http, HttpResponse} from 'msw';

describe('ProductList', () => {

    beforeAll(() => {
        
    })

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
    
})