import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../../components/ProductForm'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('ProductForm', () => {
    const renderComponent = () => {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        });
        render(
            <QueryClientProvider client={client}>
                <ProductForm onSubmit={vi.fn()}/>
            </QueryClientProvider>
    );
    }
    it('should render form field', () => {
        renderComponent();

        expect(screen.findByRole('textbox', {name: /name/i})).toBeInTheDocument();
    })
})