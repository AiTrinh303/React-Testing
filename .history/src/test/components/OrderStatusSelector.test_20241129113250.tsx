import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../components/OrderStatusSelector'
import userEvent from '@testing-library/user-event'
import { Theme } from '@radix-ui/themes'

describe('OrderStatusSelector', () => {

    const fn = vi.fn();
    const renderComponent = () => render(
        <Theme>
            <OrderStatusSelector onChange={fn} />
        </Theme>
    )


    it('should render New as a default value', () => {
        renderComponent()
        // screen.logTestingPlaygroundURL()
        const box  = screen.getByRole('combobox')
        expect(box).toHaveTextContent(/new/i)
    })

    it('should render correct status when selected', () => {
        renderComponent()
        screen.logTestingPlaygroundURL()
        const box  = screen.getByRole('combobox')
        const user = userEvent
    })
})