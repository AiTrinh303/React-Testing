/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'
import ProductForm from '../../components/ProductForm'
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

    const renderComponent = (product?:Product) => {
        const onSubmit = vi.fn();
        render (
            <ProductForm product= {product} onSubmit={onSubmit}/>,
            {wrapper: AllProviders}
        )

        return {
            onSubmit,
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

    it.each(
        [
            {
                scenario: 'missing',
                name: undefined,
                errorMessage: /require/i
            },
            {
                scenario: 'longer than 255 characters',
                name: 'a'.repeat(256),
                errorMessage: /255/i
            }
        ]
    )('should display error if name is $scenario', async({name, errorMessage}) => {
        const {waitForFormToLoad} = renderComponent();
        const form = await waitForFormToLoad();
        const user = userEvent.setup();
       if(name != undefined)
        await user.type(form.inputName, name)
        await user.type(form.inputPrice, '10');
        await user.click(form.combobox);
        const options = screen.getAllByRole('option');
        await user.click(options[0]);
        await user.click(form.submitButton);

        const alertText = screen.getByRole('alert');
        expect(alertText).toHaveTextContent(errorMessage)        
    })

    it.each(
        [
            {
                scenario: 'missing',
                price: undefined,
                errorMessage: /require/i
            },
            {
                scenario: '0',
                price: 0,
                errorMessage: /Number must be greater than or equal to 1/i
            },
            {
                scenario: 'negative',
                price: -1,
                errorMessage: /Number must be greater than or equal to 1/i
            },
            {
                scenario: 'greater than 1000',
                price: 1001,
                errorMessage: /Number must be less than or equal to 1000/i
            },
            {
                scenario: 'not a number',
                price: 'abc',
                errorMessage: /Price is required/i
            },

        ]
    )('should display error if price is $scenario', async({price, errorMessage}) => {
        const {waitForFormToLoad} = renderComponent();
        const form = await waitForFormToLoad();
        const user = userEvent.setup();
        await user.type(form.inputName, 'a')
        if(price != undefined)
        await user.type(form.inputPrice, price.toString());
        await user.click(form.combobox);
        const options = screen.getAllByRole('option');
        await user.click(options[0]);
        await user.click(form.submitButton);

        const alertText = screen.getByRole('alert');
        expect(alertText).toHaveTextContent(errorMessage)        
    })

    it('should call on Submit with the correct data', async() => {
        const {waitForFormToLoad, onSubmit} = renderComponent();
        const form = await waitForFormToLoad();
        const user = userEvent.setup();
        await user.type(form.inputName, 'a')
        await user.type(form.inputPrice, '2');
        await user.click(form.combobox);
        const options = screen.getAllByRole('option');
        await user.click(options[0]);
        await user.click(form.submitButton);


    })
})