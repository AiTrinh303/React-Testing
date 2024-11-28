import { render, screen } from '@testing-library/react'
import UserAccount from '../../components/UserAccount'
import { User } from '../../entities'

describe('UserAccount', () => {

    it('should render Username and not display button edit when user is not admin', () => {

        const user: User = { id: 1, name: 'John Doe', isAdmin: false }

        render(<UserAccount user={user} />)

        // screen.logTestingPlaygroundURL()

        const text = screen.getByText(user.name)
        expect(text).toBeInTheDocument()

        const button = screen.queryByText(/Edit/i)
        expect(button).not.toBeInTheDocument()

    })


    it('should render Username and display button edit when user is admin', () => {

        const user: User = { id: 1, name: 'John Doe', isAdmin: true }

        render(<UserAccount user={user} />)

        const text = screen.getByText(user.name)
        expect(text).toBeInTheDocument()

        const button = screen.queryByText(/Edit/i)
        expect(button).toBeInTheDocument()
    
    })
})
    
