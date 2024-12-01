import { render, screen } from '@testing-library/react'
import Label from '../../components/Label'
import { LanguageProvider } from '../../providers/language/LanguageProvider'

describe('Label', () => {

    it(' should render text in the given language', () => {
        render (
           <LanguageProvider language='en'> 
                <Label labelId = 'welcome'/>
            </LanguageProvider>
           )
           
    })
    
})