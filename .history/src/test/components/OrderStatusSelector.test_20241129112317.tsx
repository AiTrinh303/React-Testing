import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../components/OrderStatusSelector'
import userEvent from '@testing-library/user-event'
import { Theme } from '@radix-ui/themes'

describe('OrderStatusSelector', () => {
    it('should render New as a default value', () => {
        render(        
            <Theme>
                <OrderStatusSelector onChange={vi.fn()} />
            </Theme>    
        )
        screen.logTestingPlaygroundURL()

        const box  = screen.getByRole('combobox')
    })
})