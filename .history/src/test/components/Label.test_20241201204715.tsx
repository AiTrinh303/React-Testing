import { render, screen } from '@testing-library/react'
import Label from '../../components/Label'
import { LanguageProvider } from '../../providers/language/LanguageProvider'

describe.only('Label', () => {
    const renderComponent = () => {
        render (
            <LanguageProvider language='en'> 
                 <Label labelId = 'welcome'/>
             </LanguageProvider>
            )
    }

    it.each([
        {labelId: 'welcome', text:'Welcome'},
        {labelId: 'new_product', text:'New Product'},
        {labelId: 'edit_product', text:'Edit Product'}
    ])
    (' should render $text for $labelId', ({text, label}) => {
        renderComponent();
        expect(screen.getByText(text)).toBeInTheDocument()   
    })
    
})