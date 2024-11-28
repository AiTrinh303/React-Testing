import { render, screen } from '@testing-library/react'
import UserList from '../../components/UserList'
import { User } from '../../entities'


describe('UserList', () => {
 
    it('should render no users when the users array is empty', () => {
        const users: User[] = []
        render(<UserList users={users} />)

        expect(screen.getByText(/No users available/i)).toBeInTheDocument()
    })

    it('should render a list of users and each of user have link', () => {
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' }
        ]

        render(<UserList users={users} />);
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(2)

        users.forEach((user) => {
            const link = screen.getByRole('link', {name: user.name})
            expect(link).toBeInTheDocument(),
            expect(link).toHaveAttribute('href', `/users/${user.id}`)   
        })    
    })
})    