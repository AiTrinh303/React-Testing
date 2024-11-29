import { render, screen } from '@testing-library/react'
import ProductDetail from '../../components/ProductDetail'
import { server } from '../mocks/server'

describe('ProductDetail', async() => {
    it('should render the list of products', () => {
        render(<ProductDetail productId={1} />)
        const screen.findByText()
    })
})