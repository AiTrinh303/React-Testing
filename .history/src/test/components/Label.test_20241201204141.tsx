import { render, screen } from '@testing-library/react'
import Label from '../../components/Label'
import { LanguageProvider } from '../../providers/language/LanguageProvider'

describe('Label', () => {
    const renderComponent = () => {
        render (
            <LanguageProvider language='en'> 
                 <Label labelId = 'welcome'/>
             </LanguageProvider>
            )
    }

    it(' should render text in the given language', () => {
        renderComponent()
        expect(screen.getByText('Welcome')).toBeInTheDocument()   
    })
    
})