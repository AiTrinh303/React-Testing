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
    
        }
    }

    it('should render the Add to Cart button', () => {
        const { addToCartButton} = renderComponent();        
        expect( addToCartButton).toBeInTheDocument();        
    })

    it('should add the product to the cart', async() => {
        const { addToCartButton, user} = renderComponent(); 
        await user.click(addToCartButton);
        const statusQuantityText = await screen.findByRole('status')
        expect(statusQuantityText).toHaveTextContent('1') 
        const decre      
    })
    
})