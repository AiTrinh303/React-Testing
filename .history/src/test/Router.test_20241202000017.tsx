import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { navigateTo } from './utils'
import { db } from './mocks/db'

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
        const product = db.product.create()

        navigateTo(`/products/${product.id}`)
        await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i))
        screen.debug()
        const name = screen.getByText(product.name)
        expect(name).toBeInTheDocument()  
        
        db.product.delete({where: {id:{equals: product.id}}})
    })

    it('should render not found page for invalid routes', () => {
        
    })
})