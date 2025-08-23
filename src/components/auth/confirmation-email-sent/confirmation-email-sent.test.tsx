import { render, screen } from '@/test-utils';
import ConfirmationEmailSent from './confirmation-email-sent';

describe('ConfirmationEmailSent', () => {
	it('should contain all elements', async () => {
		render(<ConfirmationEmailSent email={'account@mail.com'} />);

		expect(screen.getByText(/A confirmation email has been sent to/)).toBeInTheDocument();
		expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
		expect(screen.getByText(/and it should arrive soon. Please check your inbox./)).toBeInTheDocument();
	});
});
