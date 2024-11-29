import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';



describe('SearchBox', () => {

    const renderSearchBox = () => { 
        const onChange = vi.fn();
        render(<SearchBox onChange={onChange} />);
        return {
            input: screen.getByPlaceholderText(/search/i),
            user: userEvent.setup(),
            onChange
        }
    }

    it('should render input filed for searching', () => {
        const {input} = renderSearchBox();
        expect(input).toBeInTheDocument();
    })

    it('should call onChange when enter is pressed', async () => {
        const {input, user, onChange} = renderSearchBox();
        const SearchTerm = 'SearchItem';
        await user.type(input, SearchTerm + '{enter}');
        
        expect(onChange).toHaveBeenCalledWith(SearchTerm);
    })

    it('should not call onChange if input field is empty', () => {
        const {input, user, onChange} = renderSearchBox();        
        user.type(input, '{enter}');
        expect(onChange).not.toHaveBeenCalled();
    })
    
})