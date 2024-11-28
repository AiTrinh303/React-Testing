import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableText from '../../components/ExpandableText';


describe('ExpandableText', () => {

    it('should render the full text if text is less or equal 255 characters and the button is not display', () => {
        const text = 'Hello World';
        const button = screen.queryByRole('button');
        render(<ExpandableText text={text} />);
        expect(screen.getByText(text)).toBeInTheDocument();        
        expect(button).not.toBeInTheDocument();
    })

    // it('should render maximum 255 characters for long text and the button is display with the text show more', () => {
    //     const text= 'a'.repeat(300);
    //     const limit = 255;
    //     const truncatedText = text.substring(0, limit)+'...';
        
    //     render(<ExpandableText text={text} />);
        
    //     const button = screen.getByRole('button');

    //     expect(screen.getByText(truncatedText)).toBeInTheDocument();       
    //     expect(button).toBeInTheDocument();
    //     expect(button).toHaveTextContent('Show More');
    // })

    it('should render the full text when the show more button is clicked and button change from show more to show less', async() => {
        const limit = 255;
        const text= 'a'.repeat(limit + 10);
        const truncatedText = text.substring(0, limit)+'...';
        
        render(<ExpandableText text={text} />);
        
        const button = screen.getByRole('button');
        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(button).toHaveTextContent('Show More');

        await userEvent.click(button);

        expect(screen.getByText(text)).toBeInTheDocument();
        expect(button).toHaveTextContent('Show Less');
    })

    it('should render the truncated text when the show less button is clicked and button change from show less to show more', async() => {
        const limit = 255;
        const text= 'a'.repeat(limit + 10);
        const truncatedText = text.substring(0, limit)+'...';
        
        render(<ExpandableText text={text} />);
        
        const button = screen.getByRole('button');
        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(button).toHaveTextContent('Show More');

        await userEvent.click(button);

        expect(screen.getByText(text)).toBeInTheDocument();
        expect(button).toHaveTextContent('Show Less');

        await userEvent.click(button);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(button).toHaveTextContent('Show More');
    }
)

});