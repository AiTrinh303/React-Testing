import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../components/OrderStatusSelector'
import userEvent from '@testing-library/user-event'
import { Theme } from '@radix-ui/themes'

describe('OrderStatusSelector', () => {
    
    const renderComponent = () => { 
        const fn = vi.fn();
        const optionChoice = [/new/i, /processed/i, /fulfilled/i]
        render(
        <Theme>
            <OrderStatusSelector onChange={fn} />
        </Theme>)

        return {
            box: screen.getByRole('combobox'),
            user: userEvent.setup(),
            getOptions: () => screen.findAllByRole('option'),
            optionChoice: optionChoice,
            fn: fn
        }
    }
    


    it('should render New as a default value', () => {
        const {box} = renderComponent()
        // screen.logTestingPlaygroundURL()
        // const box  = screen.getByRole('combobox')
        expect(box).toHaveTextContent(/new/i)
    })

    it('should render correct status when selected', async () => {
        const {box, user, getOptions, optionChoice} = renderComponent()
        // screen.logTestingPlaygroundURL()        

        // const box  = screen.getByRole('combobox')
        // const user = userEvent.setup()
        await user.click(box)

        // const options = await screen.findAllByRole('option')
        const options = await getOptions()
        expect(options).toHaveLength(3)

        options.forEach((option, index) => {
            expect(option).toHaveTextContent(optionChoice[index])
        })   
    })

    it.each(
        
    )('should call onChange with processed when the Processed option is selected', async () => {
        const {box, user, getOptions} = renderComponent();

        await user.click(box)



    })
})