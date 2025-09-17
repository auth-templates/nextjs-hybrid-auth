import { render, screen, waitFor, userEvent } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ResetPasswordContainer from './reset-password';

// Mock the i18n navigation router
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('@/i18n/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
		replace: mockReplace,
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
}));

describe('ResetPasswordContainer', () => {
	it('should render the reset password form with correct labels', () => {
		render(<ResetPasswordContainer />);

		expect(screen.getByLabelText('Enter your password')).toBeInTheDocument();
		expect(screen.getByLabelText('Retype your password')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument();
	});

	it('should allow user to fill out the form', async () => {
		render(<ResetPasswordContainer />);

		const passwordInput = screen.getByLabelText('Enter your password');
		const confirmPasswordInput = screen.getByLabelText('Retype your password');

		await userEvent.type(passwordInput, 'NewPassword123!');
		await userEvent.type(confirmPasswordInput, 'NewPassword123!');

		expect(passwordInput).toHaveValue('NewPassword123!');
		expect(confirmPasswordInput).toHaveValue('NewPassword123!');
	});

	it('should handle form submission', async () => {
		render(<ResetPasswordContainer />);

		const passwordInput = screen.getByLabelText('Enter your password');
		const confirmPasswordInput = screen.getByLabelText('Retype your password');
		const resetButton = screen.getByRole('button', { name: 'Reset password' });

		await userEvent.type(passwordInput, 'NewPassword123!');
		await userEvent.type(confirmPasswordInput, 'NewPassword123!');
		await userEvent.click(resetButton);

		// The form should render without crashing
		expect(resetButton).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<ResetPasswordContainer />)).not.toThrow();
	});
});
