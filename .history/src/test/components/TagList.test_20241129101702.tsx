import { render, screen } from '@testing-library/react';
import TagList from '../../components/TagList';


describe('TagList', () => {
    it('should render tags', async() => {
        render(<TagList />);
    })
    const listItems = screen.getAllByRole('listitem');
    awexpect(listItems.length).toBeGreaterThan(0);

});