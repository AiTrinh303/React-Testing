import { render, screen, waitFor } from '@testing-library/react'
import TermsAndConditions from '../../components/TermsAndConditions'
import userEvent from '@testing-library/user-event'



describe('TermsAndConditions', () => {
  const renderComponent = () => {

    render(<TermsAndConditions />)

    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button', {name: /submit/i})
    }
  }

  it('should render with correct text and initial state', () => {
   
    const {heading, checkbox, button} = renderComponent();
    // const heading = screen.getByRole('heading');
    // expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Terms & Conditions');

    // const checkbox = screen.getByRole('checkbox');
    // expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // const button = screen.getByRole('button', {name: /submit/i});
    // expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    // expect(button).toHaveTextContent(/Submit/i);

  })

  it('should enable button when checkbox is checked', async () => {
    // //Arrange
    // render(<TermsAndConditions />)
    // const checkbox = screen.getByRole('checkbox');
    // const button = screen.getByRole('button', {name: /submit/i});

    const {checkbox, button} = renderComponent();

    //Act
    // const user = userEvent.setup();
    await userEvent.click(checkbox);

    //Assert
    // await waitFor(() => {
    //     expect(button).toBeEnabled();
    // })
    expect(button).toBeEnabled();
    
  })
})