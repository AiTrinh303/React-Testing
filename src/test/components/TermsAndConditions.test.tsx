import { render, screen, waitFor } from '@testing-library/react'
import TermsAndConditions from '../../components/TermsAndConditions'
import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js'


describe('TermsAndConditions', () => {
  it('should render with correct text and initial state', () => {
   
    render(<TermsAndConditions />)
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Terms & Conditions');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button', {name: /submit/i});
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Submit/i);

  })

  it('should enable button when checkbox is checked', async () => {
    //Arrange
    render(<TermsAndConditions />)
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button', {name: /submit/i});

    //Act
    const user = userEvent.setup();
    await user.click(checkbox);

    //Assert
    // await waitFor(() => {
    //     expect(button).toBeEnabled();
    // })
    expect(button).toBeEnabled();
    
  })
})