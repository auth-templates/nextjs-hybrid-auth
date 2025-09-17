import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import LocaleSwitcher from './locale-switcher';

describe('LocaleSwitcher', () => {
	it('should render the locale switcher', () => {
		render(<LocaleSwitcher />);

		// The component should render without crashing
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<LocaleSwitcher />)).not.toThrow();
	});
});
