import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../../components/ProductForm'
import { QueryClientProvider } from 'react-query'

describe('ProductForm', () => {
    const renderComponent = () => {
        render(
            <QueryClientProvider>
                <ProductForm onSubmit={vi.fn()}/>
            </QueryClientProvider>
    );
    }
    it('should render form field', () => {
        renderComponent();

        expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument();
    })
})