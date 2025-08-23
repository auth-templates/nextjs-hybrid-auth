import { render, screen, waitFor, userEvent } from '@/test-utils';
import ResetPasswordContainer from './reset-password';

describe('ResetPasswordContainer', () => {
	test('it should display password updated component if reset email request is succesful', async () => {
		render(<ResetPasswordContainer />);
		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef8');
		await userEvent.type(confirmPasswordInput, '@Abcdef8');
		await userEvent.type(capchaInput, 'w93bx');
		await userEvent.click(resetButton);

		await waitFor(() => {
			expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument();
		});
	});

	test('it should display rest password email expired component if error "Reset token is not valid" is received from server', async () => {
		render(<ResetPasswordContainer />);
		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef8');
		await userEvent.type(confirmPasswordInput, '@Abcdef8');
		await userEvent.type(capchaInput, 'w93bx');
		await userEvent.click(resetButton);

		await waitFor(() => {
			expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument();
		});
	});

	it('should display the custom error message received from server', async () => {
		render(<ResetPasswordContainer />);

		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef8');
		await userEvent.type(confirmPasswordInput, '@Abcdef8');
		await userEvent.type(capchaInput, 'wrong-captcha');
		await userEvent.click(resetButton);

		await waitFor(() => {
			expect(screen.getByText('Wrong captcha')).toBeInTheDocument();
		});
	});
});
