import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import ExternalLink from './ExternalLink';

describe('ExternalLink', () => {
	it('should render external link', () => {
		render(<ExternalLink title="Test Link" description="Test description" href="https://example.com" />);

		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noreferrer');
		expect(screen.getByText('Test Link')).toBeInTheDocument();
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<ExternalLink title="Test" description="Test" href="https://test.com" />)).not.toThrow();
	});
});
