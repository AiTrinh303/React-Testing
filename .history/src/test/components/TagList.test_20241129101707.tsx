import { render, screen } from '@testing-library/react';
import TagList from '../../components/TagList';


describe('TagList', () => {
    it('should render tags', async() => {
        render(<TagList />);
    })
    const listItems = screen.getAllByRole('listitem');
    await waiexpect(listItems.length).toBeGreaterThan(0);

});