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
        {labelId: 'welcome', text:'Welcome'},
        {labelId: 'welcome', text:'Welcome'}
    ])
    (' should render text in the given language', () => {
        renderComponent();
        expect(screen.getByText('Welcome')).toBeInTheDocument()   
    })
    
})