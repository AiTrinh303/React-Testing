import { render, screen } from '@testing-library/react';
import ProductList from ../';

describe('ProductList', () => {
    it('should render the list of products', async() => {
        render(<ProductList />);
        const items = await screen.findAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
    })
})