/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductForm from '../../components/ProductForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Theme } from '@radix-ui/themes'
import { db } from '../mocks/db'
import { Category, Product } from '../../entities'
import AllProviders from '../AllProviders'
import userEvent from '@testing-library/user-event'


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
            waitForFormToLoad : async () =>  {
                await screen.findByRole('form')
                return {
                    inputName : screen.getByPlaceholderText(/name/i),
                    inputPrice : screen.getByPlaceholderText(/price/i),
                    combobox : screen.getByRole('combobox', {name:/category/i}),
                    submitButton: screen.getByRole('button', {name: /submit/i})
                }
            }       
        }
    }

    it('should render form field', async () => {
        const { waitForFormToLoad} = renderComponent()
        const {inputName, inputPrice, combobox} = await waitForFormToLoad();
        expect(inputName).toBeInTheDocument();
        expect(inputPrice).toBeInTheDocument();
        expect(combobox).toBeInTheDocument();
    })

    it('should populate form fields when editing a product', async() => {
        const product: Product = {
            id:1,
            name: 'Bread',
            price: 10,
            categoryId: category.id
        }

        const { waitForFormToLoad} = renderComponent(product)
        const {inputName, inputPrice, combobox} = await waitForFormToLoad();
        expect(inputName).toHaveValue(product.name);
        expect(inputPrice).toHaveValue(product.price.toString())
        expect(combobox).toBeInTheDocument();
    })

    it('should put focus on the name field', async () => {
        const {waitForFormToLoad} = renderComponent();
        const {inputName} = await waitForFormToLoad();
        expect(inputName).toHaveFocus();
    })

    it('should display error if name is missing', async() => {
        const {waitForFormToLoad} = renderComponent();
        const form = await waitForFormToLoad();
        const user = userEvent.setup();
        await user.type(form.inputPrice, '10');
        await user.click(form.combobox);
        const options = screen.getAllByRole('option');
        await user.click(options[0]);
        await user.click(form.submitButton);

        const alertText = await findByRole('alert', {name: /name/i})
        
    })
})