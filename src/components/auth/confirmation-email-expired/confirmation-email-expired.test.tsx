import { render, screen } from '@/test-utils';
import ConfirmationEmailExpired from './confirmation-email-expired';
import { PublicRoutes } from '@/routes';

describe('ConfirmationEmailExpired', () => {
	it('should contain all elements', async () => {
		render(<ConfirmationEmailExpired />);

		expect(screen.getByText(/Your account confirmation email has expired. Please go to/)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Resend activation email' })).toHaveAttribute(
			'href',
			PublicRoutes.requestActivationEmail
		);
		expect(screen.getByText(/page in order to send a new mail./)).toBeInTheDocument();
	});
});
