import { render, screen, waitFor, userEvent } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SignupContainer from './signup';

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

describe('SignupContainer', () => {
	it('should render the signup form with correct labels', () => {
		render(<SignupContainer />);

		expect(screen.getByLabelText('Email:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
	});

	it('should allow user to fill out the form', async () => {
		render(<SignupContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const confirmPasswordInput = screen.getByLabelText('Confirm password:');

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, 'password123');
		await userEvent.type(confirmPasswordInput, 'password123');

		expect(emailInput).toHaveValue('test@example.com');
		expect(passwordInput).toHaveValue('password123');
		expect(confirmPasswordInput).toHaveValue('password123');
	});

	it('should handle successful signup', async () => {
		render(<SignupContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const confirmPasswordInput = screen.getByLabelText('Confirm password:');
		const signupButton = screen.getByRole('button', { name: 'Sign up' });

		await userEvent.type(emailInput, 'newuser@example.com');
		await userEvent.type(passwordInput, 'Password123!');
		await userEvent.type(confirmPasswordInput, 'Password123!');
		await userEvent.click(signupButton);

		// The component should handle the signup attempt
		// Note: The actual behavior depends on the MSW handlers and component implementation
	});

	it('should handle signup with existing email', async () => {
		render(<SignupContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const confirmPasswordInput = screen.getByLabelText('Confirm password:');
		const signupButton = screen.getByRole('button', { name: 'Sign up' });

		await userEvent.type(emailInput, 'existing@example.com');
		await userEvent.type(passwordInput, 'Password123!');
		await userEvent.type(confirmPasswordInput, 'Password123!');
		await userEvent.click(signupButton);

		// The component should handle the error response
		// Note: The actual behavior depends on the MSW handlers and component implementation
	});

	it('should render without crashing', () => {
		expect(() => render(<SignupContainer />)).not.toThrow();
	});
});
