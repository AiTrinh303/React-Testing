import { render, screen } from '@testing-library/react'
import ProductDetail from '../../components/ProductDetail'
import { server } from '../mocks/server'

describe('ProductDetail', () => {

    it('should render the list of products', async() => {
        render(<ProductDetail productId={1} />)

        const productName = await screen.findByText(products[0].name)
        expect(productName).toBeInTheDocument()

        const productPrice = await screen.findByText(products)
        expect(productPrice).toBeInTheDocument()

        // screen.debug()
    })
})