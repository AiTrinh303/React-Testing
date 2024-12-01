import { render, screen } from '@testing-library/react'
import Label from '../../components/Label'
import { LanguageProvider } from '../../providers/language/LanguageProvider'

describe.only('Label', () => {
    const renderComponent = (labelId: string) => {
        render (
            <LanguageProvider language='en'> 
                 <Label labelId = {labelId}/>
             </LanguageProvider>
            )
    }

    describe('Given the current language is EN', () => {
        it.each([
            {labelId: 'welcome', text:'Welcome'},
            {labelId: 'new_product', text:'New Product'},
            {labelId: 'edit_product', text:'Edit Product'}
        ])
        ('should render $text for $labelId', ({text, labelId}) => {
            renderComponent(labelId);
            expect(screen.getByText(text)).toBeInTheDocument()   
        })
    })

    describe('Given the current language is ES', () => {
        it.each([
            {labelId: 'welcome', text:'Welcome'},
            {labelId: 'new_product', text:'New Product'},
            {labelId: 'edit_product', text:'Edit Product'}
        ])
        ('should render $text for $labelId', ({text, labelId}) => {
            renderComponent(labelId);
            expect(screen.getByText(text)).toBeInTheDocument()   
        })
    })




    
    
})