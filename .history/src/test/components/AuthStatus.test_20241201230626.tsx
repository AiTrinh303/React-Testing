import { render, screen } from '@testing-library/react'
import AuthStatus from '../../components/AuthStatus'
import { mockAuthState } from '../utils'

describe('AuthStatus', () => {
    it('should render loading message while fetching the aut status', () => {
        mockAuthState({
            isLoading: true,
            isAuthenticated: false,
            user: undefined
        });

        render(<AuthStatus />)

        const loadingText = screen.getByText(/loading.../i)
        expect(loadingText).toBeInTheDocument()
    })

    it('should render the login button if the user is not authenticate', () => {mockAuthState({
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    });

    render(<AuthStatus />)
        
    })
})