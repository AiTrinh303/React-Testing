import { render, screen } from '@testing-library/react'
import QuantitySelector from '../../components/QuantitySelector'
import { CartProvider } from '../../providers/CartProvider'
import { Product } from '../../entities'
import userEvent from '@testing-library/user-event'

describe('QuantitySelector', () => {

    const renderComponent = () => {
        const product: Product = {
            id: 1,
            name: 'Milk',
            price: 5,
            categoryId: 1
        }
        render (
            <CartProvider>
                <QuantitySelector product={product}/>
            </CartProvider>
        )
        const  addToCartButton = screen.getByRole('button', {name: /Add to Cart/i})

        const user = userEvent.setup()
        

       
        return {
            addToCartButton,
            user,
            getStatusQuantityText:() => screen.getByRole('status')
            getDecrementButton: () => screen.findByRole('button', {name: '-'}) 
            getIncrementButton

        }
    }

    it('should render the Add to Cart button', () => {
        const { addToCartButton} = renderComponent();        
        expect( addToCartButton).toBeInTheDocument();        
    })

    it('should add the product to the cart', async() => {
        const { addToCartButton, user, getStatusQuantityText} = renderComponent(); 
        await user.click(addToCartButton);
        
        expect(getStatusQuantityText).toHaveTextContent('1') 
             
        expect(decrementButton).toBeInTheDocument();
        const incrementButton = await screen.findByRole('button', {name: '+'})      
        expect(incrementButton).toBeInTheDocument();
        expect(addToCartButton).not.toBeInTheDocument()
    })
    
})