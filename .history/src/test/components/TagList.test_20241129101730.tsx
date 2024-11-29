import { render, screen, waitFor } from '@testing-library/react';
import TagList from '../../components/TagList';


describe('TagList', () => {
    it('should render tags', async() => {
        render(<TagList />);
    })
    const listItems = screen.getAllByRole('listitem');
    await waitFor(expect(listItems.length).toBeGreaterThan(0));

});