import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../../components/ProductForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Theme } from '@radix-ui/themes'
import exp from 'constants'

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
        await screen.findByRole('form');
        // await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i));
        const inputName = screen.getByPlaceholderText(/name/i);
        expect(inputName).toBeInTheDocument();
        const inputPrice = screen.getByPlaceholderText(/price/i);
        expect(inputPrice).toBeInTheDocument();
        const combobox = screen.getByRole('combobox', {name:/category/i});
        expect(combobox).toBeInTheDocument();
        const user = UserEvent.set
      
    })
})