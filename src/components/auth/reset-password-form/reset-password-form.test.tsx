import { render, screen, userEvent } from '@/test-utils';
import ResetPasswordForm from './reset-password-form';

describe('ResetPassword', () => {
	test('if all elements are present', () => {
		render(
			<ResetPasswordForm
				onReset={jest.fn()}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter captcha')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if the right values are received by onReset callback', async () => {
		const mockOnReset = jest.fn();
		render(
			<ResetPasswordForm
				onReset={mockOnReset}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);

		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef8');
		await userEvent.type(confirmPasswordInput, '@Abcdef8');
		await userEvent.type(capchaInput, 'w93bx');
		await userEvent.click(resetButton);

		expect(mockOnReset).toBeCalledWith({
			password: '@Abcdef8',
			confirmPassword: '@Abcdef8',
			captcha: 'w93bx',
		});
	});

	test('if message box is displayed when an error is received from the server', () => {
		render(
			<ResetPasswordForm
				onReset={jest.fn()}
				status={{ theme: 'error', lines: ['Failed to reset password. Please try again!'] }}
			/>
		);

		expect(screen.getByText(/Failed to reset password. Please try again!/)).toBeInTheDocument();
	});

	test('if password updated component is displayed when "Password updated" message is received', () => {
		render(<ResetPasswordForm onReset={jest.fn()} status={{ theme: 'info', lines: ['Password updated'] }} />);

		expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument();
	});

	test('if reset password email expired component is displayed when "Reset token is not valid message is received', () => {
		render(
			<ResetPasswordForm onReset={jest.fn()} status={{ theme: 'info', lines: ['Reset token is not valid'] }} />
		);

		expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument();
	});

	test('if password inputs have theme danger and a message is displayed when a password is invalid', async () => {
		render(
			<ResetPasswordForm
				onReset={jest.fn()}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);

		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef');
		await userEvent.type(confirmPasswordInput, '@Abcdef');
		await userEvent.type(capchaInput, 'w93bx');
		await userEvent.click(resetButton);

		expect(passwordInput).toHaveClass('danger');
		expect(confirmPasswordInput).toHaveClass('danger');
		expect(
			screen.getByText(
				/You password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol and one number./
			)
		).toBeInTheDocument();
	});

	test('if password inputs have theme danger and a message is displayed when passwords do no match', async () => {
		render(
			<ResetPasswordForm
				onReset={jest.fn()}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);

		const passwordInput = screen.getByLabelText('Password');
		const confirmPasswordInput = screen.getByLabelText('Confirm password');
		const capchaInput = screen.getByPlaceholderText('Enter captcha');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef9');
		await userEvent.type(confirmPasswordInput, '@Abcdef');
		await userEvent.type(capchaInput, 'w93bx');
		await userEvent.click(resetButton);

		expect(passwordInput).toHaveClass('danger');
		expect(confirmPasswordInput).toHaveClass('danger');
		expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
	});
});
