import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../../components/ProductForm'

describe('ProductForm', () => {
    const renderComponent = () => {
        render(
            <><ProductForm onSubmit={vi.fn()}/></>
    );
    }
    it('should render form field', () => {
        render(<ProductForm onSubmit={vi.fn()}/>);

        expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument();
    })
})