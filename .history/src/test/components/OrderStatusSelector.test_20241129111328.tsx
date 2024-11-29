import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../components/OrderStatusSelector'
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
    it('should render New as a default value', () => {
        render(
        <OrderStatusSelector onChange={vi.fn()} />)

    })
})