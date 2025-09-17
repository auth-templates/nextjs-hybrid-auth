import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import TermsCheckbox from './terms-checkbox';

describe('TermsCheckbox', () => {
	it('should render the terms checkbox', () => {
		render(<TermsCheckbox />);

		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('should render with custom props', () => {
		render(<TermsCheckbox checked={true} disabled={true} />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
		expect(checkbox).toBeDisabled();
	});

	it('should render without crashing', () => {
		expect(() => render(<TermsCheckbox />)).not.toThrow();
	});
});
