import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './not-found-page';

describe('NotFoundPage', () => {
	it('should render not found page', () => {
		render(<NotFoundPage />);

		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
		expect(screen.getByText(/Page not found/)).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<NotFoundPage />)).not.toThrow();
	});
});
