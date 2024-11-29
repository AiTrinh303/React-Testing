import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastDemo from '../../components/ToastDemo';


describe('ToastDemo', () => {
    it('should render a toast', () => {
        render(
            
            <ToastDemo />);
    })
})