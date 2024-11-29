import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


describe('SearchBox', () => {

    const renderSearchBox = () => { 
        const onChange = vi.fn();
        render(<SearchBox onChange={onChange} />);
        return {
            input: screen.getByPlaceholderText(/search/i),
            onChange
        }
    }

    it('should render input filed for searching', () => {
        const {input} = renderSearchBox();
        expect(input).toBeInTheDocument();
    })

    it('should call onChange when enter is pressed', () => {
        const {input, onChange} = renderSearchBox();

        const user = userEvent.setup;
        
    })
    
})
