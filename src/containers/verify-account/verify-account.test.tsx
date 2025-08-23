import { render, screen, waitFor } from '@/test-utils';
import VerifyAccountContainer from './verify-account';

describe('VerifyAccountContainer', () => {
	test('it should display account verified message if reset email request is succesful', async () => {
		render(<VerifyAccountContainer />);

		await waitFor(() => {
			expect(screen.getByText(/Your account has been verified successfully. Please go to/)).toBeInTheDocument();
		});
	});

	test('if account confirmation email expired component is displayed when "Confirmation token is not valid" message is received', async () => {
		render(<VerifyAccountContainer />);
		await waitFor(() => {
			expect(screen.getByText(/Your account confirmation email has expired. Please go to/)).toBeInTheDocument();
		});
	});

	it('should display the custom error message received from server', async () => {
		render(<VerifyAccountContainer />);

		await waitFor(() => {
			expect(screen.getByText('Custom message')).toBeInTheDocument();
		});
	});
});
