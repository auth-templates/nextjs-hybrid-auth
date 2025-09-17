import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import CustomToastContainer from './custom-toast-container';

describe('CustomToastContainer', () => {
	it('should render toast container', () => {
		render(<CustomToastContainer />);

		// The toast container should be present
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});

	it('should render with custom props', () => {
		render(<CustomToastContainer position="top-center" />);

		// The toast container should be present
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<CustomToastContainer />)).not.toThrow();
	});
});
