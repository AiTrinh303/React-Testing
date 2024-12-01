import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '../routes'

describe('Router', () => {
    it('should render the home page for /', () => {
        createMemoryRouter(routes, {
            initialEntries: ['/']
        })

        render(<RouterProvider router =  )
        
    })
})