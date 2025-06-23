import { render, screen } from '@/test-utils';
import ConfirmationEmailExpired from './confirmation-email-expired';
import { PublicRoutes } from '@/routes';

describe("ConfirmationEmailExpired", () => {
    it('should contain all elements', async () => {
        render(
            <ConfirmationEmailExpired />
        );

        expect(screen.getByText(/Your account confirmation email has expired. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', {name: 'Resend confirmation email'})).toHaveAttribute('href', PublicRoutes.resendConfirmationEmail);
        expect(screen.getByText(/page in order to send a new mail./)).toBeInTheDocument();
    });
});