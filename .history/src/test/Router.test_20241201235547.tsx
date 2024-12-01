import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { navigateTo } from './utils'

describe('Router', () => {
    it('should render the home page for /', () => {
        // const router = createMemoryRouter(routes, {
        //     initialEntries: ['/']
        // })
        // render(<RouterProvider router = {router} />)
        navigateTo('/')
        const heading = screen.getByRole('heading', {name: /home/i})
        expect(heading).toBeInTheDocument()      
    })

    it('should render the products page for /products', () => {
        // const router = createMemoryRouter(routes, {
        //     initialEntries: ['/products']
        // })
        // render(<RouterProvider router = {router} />)
        navigateTo('/products')
        const heading = screen.getByRole('heading', {name: /products/i})
        expect(heading).toBeInTheDocument()        
    })

    it('should render product following productid ', async() => {
        db.product.create

        navigateTo(`/products/${product.id}`)
        await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i))
        screen.debug()
        const heading = screen.getByRole('heading', {name: /product detail/i})
        expect(heading).toBeInTheDocument()      
    })
})