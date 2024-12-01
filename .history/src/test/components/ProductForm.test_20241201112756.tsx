import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../../components/ProductForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Theme } from '@radix-ui/themes'

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
                <Theme>
                    <ProductForm onSubmit={vi.fn()}/>
                </Theme>
            </QueryClientProvider>
    );
    }
    it('should render form field', async() => {
        renderComponent();
        screen.logTestingPlaygroundURL()
        const inputNamw
    })
})