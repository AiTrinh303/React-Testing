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
yTex
    })
})