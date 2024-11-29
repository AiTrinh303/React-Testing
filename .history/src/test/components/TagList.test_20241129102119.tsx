import { render, screen, waitFor } from '@testing-library/react';
import TagList from '../../components/TagList';


describe('TagList', () => {
    it('should render tags', async() => {
        render(<TagList />);

        //Solution 1:
        await waitFor(() => {
            const listItems = screen.getAllByRole('listitem');
            expect(listItems.length).toBeGreaterThan(0);
        });

        //Solution 2:
    })
   

});