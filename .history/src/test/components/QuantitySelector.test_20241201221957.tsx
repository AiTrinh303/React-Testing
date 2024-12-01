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
            getQuantityControl: () => ({
                statusQuantityText:  screen.queryByRole('status'),
                decrementButton: screen.queryByRole('button', {name: '-'}),
                incrementButton: screen.queryByRole('button', {name: '+'})
            })
        }
    }

    it('should render the Add to Cart button', () => {
        const { addToCartButton} = renderComponent();        
        expect( addToCartButton).toBeInTheDocument();        
    })

    it('should add the product to the cart', async() => {
        const { addToCartButton, user, getQuantityControl} = renderComponent(); 
        await user.click(addToCartButton);
        const {statusQuantityText, decrementButton, incrementButton} = getQuantityControl()        
        expect(statusQuantityText).toHaveTextContent(/1/i);             
        expect(decrementButton).toBeInTheDocument();            
        expect(incrementButton).toBeInTheDocument();
        expect(addToCartButton).not.toBeInTheDocument()
    })

    it('should increment the quantity when click button +', async() => {
        const { addToCartButton, user, getQuantityControl} = renderComponent(); 
        await user.click(addToCartButton);    
        const {statusQuantityText, incrementButton} = getQuantityControl()
        await user.click(incrementButton!);
        expect(statusQuantityText).toHaveTextContent('2');
    })

    it('should decrement the quantity when click button -', async() => {
        const { addToCartButton, user, getQuantityControl} = renderComponent(); 
        const {statusQuantityText, decrementButton} = getQuantityControl() ;
        await user.click(addToCartButton);           
        await user.click( decrementButton!);
       expect(statusQuantityText).not.toBeInTheDocument()
    })
    
    
    
})