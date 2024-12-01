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
        
    })

    
    
})