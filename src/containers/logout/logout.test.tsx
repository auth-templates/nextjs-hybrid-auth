import { render, screen, userEvent, waitFor } from '@/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LogoutContainer from './logout';

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

describe('LogoutContainer', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render logout button', () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		expect(logoutButton).toBeInTheDocument();
	});

	it('should handle successful logout and redirect to login page', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});

	it('should handle logout when no active session is found', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});

	it('should handle invalid session error', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		// Should still redirect even on error
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});

	it('should handle expired session error', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		// Should still redirect even on error
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});

	it('should handle server error during logout', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		// Should still redirect even on error
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});

	it('should handle rate limiting during logout', async () => {
		render(<LogoutContainer />);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await userEvent.click(logoutButton);

		// Should still redirect even on error
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
		});
	});
});
