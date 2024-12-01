import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '../routes'scree

describe('Router', () => {
    it('should render the home page for /', () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/']
        })

        render(<RouterProvider router = {router} />)

        const heading = 
        
    })
})