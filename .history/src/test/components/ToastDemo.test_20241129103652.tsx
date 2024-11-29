import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastDemo from '../../components/ToastDemo';
import { Toaster } from 'react-hot-toast';


describe('ToastDemo', () => {
    it('should render a toast', () => {
        render(
            <>
                <ToastDemo />
                <Toaster/>
            </>
        );

        const button
    })
})