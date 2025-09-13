import { render, screen } from '@/test-utils';
import ActivationEmailSent from './activation-email-sent';

describe('ConfirmationEmailSent', () => {
	it('should contain all elements', async () => {
		render(<ActivationEmailSent email={'account@mail.com'} />);

		expect(screen.getByText(/A confirmation email has been sent to/)).toBeInTheDocument();
		expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
		expect(screen.getByText(/and it should arrive soon. Please check your inbox./)).toBeInTheDocument();
	});
});
