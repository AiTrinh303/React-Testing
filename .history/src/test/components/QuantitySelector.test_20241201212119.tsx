import { render, screen } from '@testing-library/react'
import QuantitySelector from '../../components/QuantitySelector'
import { CartProvider } from '../../providers/CartProvider'
import { Product } from '../../entities'

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
        const addButton = screen.getByRole('button', {name: /Add to Cart/i})
        return {
            addButton
        }
    }

    it('should render the Add to Cart button', () => {
        const renderComponent();
        
        expect(addButton).toBeInTheDocument();        
    })
    
})