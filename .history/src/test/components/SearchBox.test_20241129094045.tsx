import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';


describe('SearchBox', () => {
    it('should render input filed for searching', () => {
        render(<SearchBox onChange={vi.fn()} />);   
        const input = screen.getByPlaceholderText(/search/i);
    })
    
})
