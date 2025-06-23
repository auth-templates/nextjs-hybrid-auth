import { render, screen } from '@/test-utils';
import AccountVerified from './account-verified';
import { PublicRoutes } from '@/routes';

describe("AccountVerified", () => {
    it('should contain all elements', async () => {
        render(
            <AccountVerified />
        );

        expect(screen.getByText(/Your account has been verified successfully. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', PublicRoutes.login);
        expect(screen.getByText(/page to sign in./)).toBeInTheDocument();
    });
});