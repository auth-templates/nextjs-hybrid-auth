import { render, screen } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import NavigationLink from './navigation-link';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
	useSelectedLayoutSegment: vi.fn(() => 'dashboard'),
}));

// Mock the i18n navigation Link component
vi.mock('@/i18n/navigation', () => ({
	Link: ({ children, href, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

describe('NavigationLink', () => {
	it('should render navigation link', () => {
		render(<NavigationLink href="/dashboard">Dashboard</NavigationLink>);

		const link = screen.getByRole('link', { name: 'Dashboard' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/dashboard');
	});

	it('should mark active link correctly', () => {
		render(<NavigationLink href="/dashboard">Dashboard</NavigationLink>);

		const link = screen.getByRole('link', { name: 'Dashboard' });
		expect(link).toHaveAttribute('aria-current', 'page');
	});

	it('should render without crashing', () => {
		expect(() => render(<NavigationLink href="/test">Test</NavigationLink>)).not.toThrow();
	});
});
