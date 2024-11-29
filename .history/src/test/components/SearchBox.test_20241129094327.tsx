import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


describe('SearchBox', () => {

    const renderSearchBox = () => { 
        render(<SearchBox onChange={vi.fn()} />);
        return {
            input: screen.getByPlaceholderText(/search/i),
        }
    }

    it('should render input filed for searching', () => {
        const {inputrenderSearchBox();
        expect(input).toBeInTheDocument();
    })
    
})
