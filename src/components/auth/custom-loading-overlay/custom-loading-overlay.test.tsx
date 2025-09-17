import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import { CustomLoadingOverlay } from './custom-loading-overlay';

describe('CustomLoadingOverlay', () => {
	it('should render when visible is true', () => {
		render(<CustomLoadingOverlay visible={true} />);

		// The loading overlay should be present
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});

	it('should not render when visible is false', () => {
		render(<CustomLoadingOverlay visible={false} />);

		// The loading overlay should not be present
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<CustomLoadingOverlay visible={true} />)).not.toThrow();
	});
});
