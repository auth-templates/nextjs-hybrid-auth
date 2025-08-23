import { render, screen } from '@/test-utils';
import AccountNotActive from './account-not-active';
import { PublicRoutes } from '../../../routes';

describe('AccountNotActive', () => {
	it('should contain all elements', async () => {
		render(<AccountNotActive email={'account@mail.com'} />);

		expect(screen.getByText(/An account with the email/)).toBeInTheDocument();
		expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
		expect(screen.getByText(/exists, but it is not active./)).toBeInTheDocument();
		expect(screen.getByText(/Check your inbox for the confirmation email or please go to/)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Resend confirmation email' })).toHaveAttribute(
			'href',
			PublicRoutes.requestConfirmationEmail
		);
		expect(screen.getByText(/page in order to send a new confirmation email./)).toBeInTheDocument();
	});
});
