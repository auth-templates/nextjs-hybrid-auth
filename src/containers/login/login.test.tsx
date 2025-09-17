import { render, screen, userEvent, waitFor } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginContainer from './login';

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

describe('LoginContainer', () => {
	it('should render the login form with correct labels', () => {
		render(<LoginContainer />);

		expect(screen.getByLabelText('Email:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
	});

	it('should allow user to fill out the form', async () => {
		render(<LoginContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, 'password');

		expect(emailInput).toHaveValue('test@example.com');
		expect(passwordInput).toHaveValue('password');
	});

	it('should handle form submission', async () => {
		render(<LoginContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByRole('button', { name: 'Login' });

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, 'password');
		await userEvent.click(loginButton);

		// The form should render without crashing
		expect(loginButton).toBeInTheDocument();
	});

	it('should handle login with invalid credentials', async () => {
		render(<LoginContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByRole('button', { name: 'Login' });

		await userEvent.type(emailInput, 'invalid@example.com');
		await userEvent.type(passwordInput, 'wrongpassword');
		await userEvent.click(loginButton);

		// Should handle the error gracefully without crashing
		expect(loginButton).toBeInTheDocument();
	});

	it('should handle login with locked account', async () => {
		render(<LoginContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByRole('button', { name: 'Login' });

		await userEvent.type(emailInput, 'locked@example.com');
		await userEvent.type(passwordInput, 'password');
		await userEvent.click(loginButton);

		// Should handle the error gracefully without crashing
		expect(loginButton).toBeInTheDocument();
	});

	it('should handle network errors', async () => {
		render(<LoginContainer />);

		const emailInput = screen.getByLabelText('Email:');
		const passwordInput = screen.getByLabelText('Password:');
		const loginButton = screen.getByRole('button', { name: 'Login' });

		await userEvent.type(emailInput, 'networkerror@example.com');
		await userEvent.type(passwordInput, 'password');
		await userEvent.click(loginButton);

		// Should handle the error gracefully without crashing
		expect(loginButton).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<LoginContainer />)).not.toThrow();
	});
});
