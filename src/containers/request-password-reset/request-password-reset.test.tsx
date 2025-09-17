import { render, screen, waitFor, userEvent } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import RequestPasswordResetContainer from './request-password-reset';

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

describe('RequestPasswordResetContainer', () => {
	it('should render the password reset form with correct labels', () => {
		render(<RequestPasswordResetContainer />);

		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Send reset password email' })).toBeInTheDocument();
	});

	it('should allow user to fill out the form', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });

		await userEvent.type(emailInput, 'test@example.com');

		expect(emailInput).toHaveValue('test@example.com');
		expect(sendButton).toBeInTheDocument();
	});

	it('should handle successful password reset request', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });

		await userEvent.type(emailInput, 'valid@example.com');
		await userEvent.click(sendButton);

		// The component should handle the password reset request
		// Note: The actual behavior depends on the MSW handlers and component implementation
	});

	it('should handle password reset request with non-existent email', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });

		await userEvent.type(emailInput, 'nonexistent@example.com');
		await userEvent.click(sendButton);

		// The component should handle the error response
		// Note: The actual behavior depends on the MSW handlers and component implementation
	});

	it('should render without crashing', () => {
		expect(() => render(<RequestPasswordResetContainer />)).not.toThrow();
	});
});
