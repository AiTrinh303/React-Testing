import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';

describe('ProductList', () => {
    it('should render the list of products', () => {
        render(<ProductList />);
        const items = screen.getAllByRole('listitem');
        expect(items.lenghth;
    })
})