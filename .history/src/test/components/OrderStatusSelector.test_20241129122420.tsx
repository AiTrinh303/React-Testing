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

        return {}
    )


    it('should render New as a default value', () => {
        renderComponent()
        // screen.logTestingPlaygroundURL()
        const box  = screen.getByRole('combobox')
        expect(box).toHaveTextContent(/new/i)
    })

    it('should render correct status when selected', async () => {
        renderComponent()
        // screen.logTestingPlaygroundURL()

        const optionChoice = [/new/i, /processed/i, /fulfilled/i]

        const box  = screen.getByRole('combobox')
        const user = userEvent.setup()
        await user.click(box)

        const options = await screen.findAllByRole('option')
        expect(options).toHaveLength(3)

        options.forEach((option, index) => {
            expect(option).toHaveTextContent(optionChoice[index])
        })
        
        
    })
})