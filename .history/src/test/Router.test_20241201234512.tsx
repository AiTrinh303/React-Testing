import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '../routes'

describe('Router', () => {
    it('should render the home page for /', () => {
        // const router = createMemoryRouter(routes, {
        //     initialEntries: ['/']
        // })
        // render(<RouterProvider router = {router} />)
        
        screen.debug()
        const heading = screen.getByRole('heading', {name: /home/i})
        expect(heading).toBeInTheDocument()      
    })

    it('should render the products page for /products', () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/products']
        })
        render(<RouterProvider router = {router} />)
        screen.debug()
        const heading = screen.getByRole('heading', {name: /products/i})
        expect(heading).toBeInTheDocument()        
    })
})