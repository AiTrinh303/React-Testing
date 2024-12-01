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
        return {

        }
    }

    it('should render the Add to Cart button', () => {
        renderComponent();
        
        expect(addButton).toBeInTheDocument();        
    })
    
})