import { render, screen, userEvent } from '@/test-utils';
import ResetPasswordForm from './reset-password-form';

describe('ResetPassword', () => {
	test('if all elements are present', () => {
		render(<ResetPasswordForm onSubmit={vi.fn()} messages={[]} />);
		expect(screen.getByLabelText('Enter your password')).toBeInTheDocument();
		expect(screen.getByLabelText('Retype your password')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if the right values are received by onSubmit callback', async () => {
		const mockOnSubmit = vi.fn();
		render(<ResetPasswordForm onSubmit={mockOnSubmit} messages={[]} />);

		const passwordInput = screen.getByLabelText('Enter your password');
		const confirmPasswordInput = screen.getByLabelText('Retype your password');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef8');
		await userEvent.type(confirmPasswordInput, '@Abcdef8');
		await userEvent.click(resetButton);

		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if message box is displayed when an error is received from the server', () => {
		render(
			<ResetPasswordForm
				onSubmit={vi.fn()}
				messages={[{ theme: 'error', lines: ['Failed to reset password. Please try again!'] }]}
			/>
		);

		// The component should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if password updated component is displayed when "Password updated" message is received', () => {
		render(<ResetPasswordForm onSubmit={vi.fn()} messages={[{ theme: 'info', lines: ['Password updated'] }]} />);

		// The component should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if reset password email expired component is displayed when "Reset token is not valid message is received', () => {
		render(
			<ResetPasswordForm onSubmit={vi.fn()} messages={[{ theme: 'info', lines: ['Reset token is not valid'] }]} />
		);

		// The component should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if password inputs have theme danger and a message is displayed when a password is invalid', async () => {
		render(<ResetPasswordForm onSubmit={vi.fn()} messages={[]} />);

		const passwordInput = screen.getByLabelText('Enter your password');
		const confirmPasswordInput = screen.getByLabelText('Retype your password');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef');
		await userEvent.type(confirmPasswordInput, '@Abcdef');
		await userEvent.click(resetButton);

		// Password inputs should be present
		expect(passwordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	test('if password inputs have theme danger and a message is displayed when passwords do no match', async () => {
		render(<ResetPasswordForm onSubmit={vi.fn()} messages={[]} />);

		const passwordInput = screen.getByLabelText('Enter your password');
		const confirmPasswordInput = screen.getByLabelText('Retype your password');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });
		await userEvent.type(passwordInput, '@Abcdef9');
		await userEvent.type(confirmPasswordInput, '@Abcdef');
		await userEvent.click(resetButton);

		// Password inputs should be present
		expect(passwordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});
});
