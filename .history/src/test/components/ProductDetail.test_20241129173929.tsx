import { render, screen } from '@testing-library/react'
import ProductDetail from '../../components/ProductDetail'
import { server } from '../mocks/server'
import { products } from '../mocks/data'

describe('ProductDetail', () => {

    it('should render the list of products', async() => {
        render(<ProductDetail productId={1} />)

        const productName = await screen.findByText(new RegExp(products[0].name))
        expect(productName).toBeInTheDocument()

        const productPrice = await screen.findByText(new RegExp(products[0].price.toString()))
        expect(productPrice).toBeInTheDocument()

        // screen.debug()
    })

    it('should render error when product is not found', async() => {
        render(<ProductDetail productId={4} />)

        const error = await screen.findByText(/The given product was not found./)
        expect(error).toBeInTheDocument()
    })
})