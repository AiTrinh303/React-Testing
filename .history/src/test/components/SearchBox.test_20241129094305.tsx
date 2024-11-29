import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


describe('SearchBox', () => {

    const renderSearchBox = () => { 
        render(<SearchBox onChange={vi.fn()} />);
        return {
            input
        }
    }



    it('should render input filed for searching', () => {
        render(<SearchBox onChange={vi.fn()} />);   
        const input = screen.getByPlaceholderText(/search/i);
        expect(input).toBeInTheDocument();
    })
    
})
