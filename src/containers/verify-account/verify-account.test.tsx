import { render, screen, waitFor } from '@/test-utils';
import { describe, it, expect, test, vi } from 'vitest';
import VerifyAccountContainer from './verify-account';

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

// Mock useParams and useSearchParams to provide a token
vi.mock('next/navigation', () => ({
	useParams: () => ({ token: 'test-token' }),
	useSearchParams: () => new URLSearchParams('token=test-token'),
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
	usePathname: () => '/test',
}));

describe('VerifyAccountContainer', () => {
	// it('should render the verify account component', () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle successful verification', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle expired token', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle custom error messages', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle invalid token format', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle expired token', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle already used token', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle token not found', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle already verified account', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle server errors', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	// it('should handle rate limiting', async () => {
	// 	render(<VerifyAccountContainer />);

	// 	// The component should render without crashing
	// 	expect(screen.getByTestId('verify-account')).toBeInTheDocument();
	// });

	it('should render without crashing', () => {
		expect(() => render(<VerifyAccountContainer />)).not.toThrow();
	});
});
