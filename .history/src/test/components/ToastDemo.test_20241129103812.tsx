import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastDemo from '../../components/ToastDemo';
import { Toaster } from 'react-hot-toast';


describe('ToastDemo', () => {
    it('should render a toast', async() => {
        render(
            <>
                <ToastDemo />
                <Toaster/>
            </>
        );

        const button = screen.getByRole('button', {name: /show toast/i});
        const user = userEvent.setup();
        user.click(button);
    })
})