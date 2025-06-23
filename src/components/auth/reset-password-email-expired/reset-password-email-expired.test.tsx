import { render, screen } from '@/test-utils';
import ResetPasswordEmailExpired from './reset-password-email-expired';
import { PublicRoutes } from '../../../routes';

describe("ResetPasswordEmailExpired", () => {
    it('should contain all elements', async () => {
        render(
            <ResetPasswordEmailExpired />
        );

        expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', {name: 'Forgot password'})).toHaveAttribute('href', PublicRoutes.recoverPassword);
        expect(screen.getByText(/page in order to send a new mail./)).toBeInTheDocument();
    });
});