/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductForm from '../../components/ProductForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Theme } from '@radix-ui/themes'
import { db } from '../mocks/db'
import { Category, Product } from '../../entities'
import AllProviders from '../AllProviders'


describe('ProductForm', () => {
    let category: Category;

    beforeAll(() => {
        category = db.category.create();
    })

    afterAll(() => {
        db.category.delete({
            where: {id: {equals: category.id}}
        })
    })

    // const renderComponent = () => {
    //     const client = new QueryClient({
    //         defaultOptions: {
    //             queries: {
    //                 retry: false
    //             }
    //         }
    //     });
    //     render(
    //         <QueryClientProvider client={client}>
    //             <Theme>
    //                 <ProductForm onSubmit={vi.fn()}/>
    //             </Theme>
    //         </QueryClientProvider>
    // );
    // }

    const renderComponent = (product?:Product) => {
        render (<ProductForm product= {product} onSubmit={vi.fn()}/>,{wrapper: AllProviders})

        return {
            waitForFormToLoad : () =>  screen.findByRole('form'),
            name
        }
    }
    it('should render form field', async() => {
        const { waitForFormToLoad} = renderComponent()

        await waitForFormToLoad();
        // await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i));
        const inputName = screen.getByPlaceholderText(/name/i);
        expect(inputName).toBeInTheDocument();
        const inputPrice = screen.getByPlaceholderText(/price/i);
        expect(inputPrice).toBeInTheDocument();
        const combobox = screen.getByRole('combobox', {name:/category/i});
        expect(combobox).toBeInTheDocument();
    })
    it('should populate form fields when editing a product', async() => {
        const product: Product = {
            id:1,
            name: 'Bread',
            price: 10,
            categoryId: category.id
        }

        const { waitForFormToLoad} = renderComponent()

        await waitForFormToLoad();
        // await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i));
        const inputName = screen.getByPlaceholderText(/name/i);
        // expect(inputName).toBeInTheDocument();
        expect(inputName).toHaveValue(product.name);
        const inputPrice = screen.getByPlaceholderText(/price/i);
        // expect(inputPrice).toBeInTheDocument();
        expect(inputPrice).toHaveValue(product.price.toString())
        const combobox = screen.getByRole('combobox', {name:/category/i});
        expect(combobox).toBeInTheDocument();
    })
})