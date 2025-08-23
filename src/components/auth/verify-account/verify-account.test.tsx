import { render, screen } from '@/test-utils';
import VerifyAccount from './verify-account';

describe('VerifyAccount', () => {
	test('if all initial elements are present', () => {
		render(
			<VerifyAccount
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		expect(screen.getByTestId('small-lds-ring')).toBeInTheDocument();
	});

	test('if message box is displayed when an error is received from the server', async () => {
		render(<VerifyAccount status={{ theme: 'error', lines: ['Failed verify account. Please try again!'] }} />);

		expect(await screen.getByText(/Failed verify account. Please try again!/)).toBeInTheDocument();
	});

	test('if account verified component is displayed when "Account verified" message is received', async () => {
		render(<VerifyAccount status={{ theme: 'info', lines: ['Account verified'] }} />);

		expect(
			await screen.findByText(/Your account has been verified successfully. Please go to/)
		).toBeInTheDocument();
	});

	test('if account confirmation email expired component is displayed when "Confirmation token is not valid" message is received', async () => {
		render(<VerifyAccount status={{ theme: 'error', lines: ['Confirmation token is not valid'] }} />);

		expect(
			await screen.findByText(/Your account confirmation email has expired. Please go to/)
		).toBeInTheDocument();
	});
});
