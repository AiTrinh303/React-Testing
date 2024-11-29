import { render, screen } from '@testing-library/react';
import TagList from '../../components/TagList';


describe('TagList', () => {
    it('should render tags', () => {
        render(<TagList />);
    })
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.lenght)

});