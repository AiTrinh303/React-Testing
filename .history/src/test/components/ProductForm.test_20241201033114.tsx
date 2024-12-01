import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm (from '../../components/ProductForm'

describe('ProductForm', () => {
    it('should render form field', () => {
        render(<ProductForm onSubmit={vi.fn}/>)
    })
})