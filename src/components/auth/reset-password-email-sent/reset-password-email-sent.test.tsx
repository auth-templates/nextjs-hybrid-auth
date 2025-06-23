import { render, screen } from '@/test-utils';
import ResetPasswordEmailSent from './reset-password-email-sent';
describe("ResetPasswordEmailSent", () => {
    it('should contain all elements', async () => {
        render(
            <ResetPasswordEmailSent email={'account@mail.com'} />
        );

        expect(screen.getByText(/An email with reset password intructions has been sent to/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/and it should arrive soon. Please check your inbox./)).toBeInTheDocument();
    });
});