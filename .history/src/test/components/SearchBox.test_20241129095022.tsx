import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';



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

    it('should call onChange when enter is pressed', async () => {
        const {input, onChange} = renderSearchBox();

        const user = userEvent.setup();
        await user.type(input, 'SearchItem{enter}');
        
        expect onChange).toHaveBeenCalledWith(/SearchItem/i);
    })
    
})
