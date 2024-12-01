import { render, screen } from '@testing-library/react'
import QuantitySelector from '../../components/QuantitySelector'
import { CartProvider } from '../../providers/CartProvider'

describe('QuantitySelector', () => {

    it('should render the Add to Cart button', () => {
        const product
        render (
            <CartProvider>
                <QuantitySelector />
            </CartProvider>
        )
        
    })
    
})