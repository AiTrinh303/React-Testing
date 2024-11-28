import { render, screen } from '@testing-library/react'
import Greet from '../../components/Greet'

describe('Greet', () => {
  it('should render hello with the name when name is provided', () => {
    render(<Greet name="JoJo" />)
    screen.debug()
    screen.logTestingPlaygroundURL()
    const greeting = screen.getByRole('heading', {name: /hello jojo/i})
    expect(greeting).toBeInTheDocument()
    expect(greeting).toHaveTextContent(/Hello JoJo/i)  
  })

  it('should render login button when name is not provided', () => {
    render(<Greet />)
    const loginButton = screen.getByRole('button', {name: /login/i})
    expect(loginButton).toBeInTheDocument()
  })
})