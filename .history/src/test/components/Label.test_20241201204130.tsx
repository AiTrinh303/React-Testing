import { render, screen } from '@testing-library/react'
import Label from '../../components/Label'
import { LanguageProvider } from '../../providers/language/LanguageProvider'

describe('Label', () => {
    const renderComponent = () => {

    }

    it(' should render text in the given language', () => {
       
        expect(screen.getByText('Welcome')).toBeInTheDocument()   
    })
    
})