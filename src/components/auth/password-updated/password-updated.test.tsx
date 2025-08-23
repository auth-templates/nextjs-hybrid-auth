import { render, screen } from '@/test-utils';
import PasswordUpdated from './password-updated';
import { PublicRoutes } from '@/routes';

describe('PasswordUpdated', () => {
	it('should contain all elements', async () => {
		render(<PasswordUpdated />);

		expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', PublicRoutes.login);
		expect(screen.getByText(/page to sign./)).toBeInTheDocument();
	});
});
