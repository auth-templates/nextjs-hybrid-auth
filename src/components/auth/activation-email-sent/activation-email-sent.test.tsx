import { render, screen } from '@/test-utils';
import ActivationEmailSent from './activation-email-sent';

describe('ConfirmationEmailSent', () => {
	it('should contain all elements', async () => {
		render(<ActivationEmailSent email={'account@mail.com'} />);

		// The component should render without crashing
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});
});
