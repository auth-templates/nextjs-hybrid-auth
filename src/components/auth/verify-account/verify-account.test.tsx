import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import VerifyAccount from './verify-account';

describe('VerifyAccount', () => {
	it('should render loading state', () => {
		render(<VerifyAccount loading={true} />);

		// The component should render without crashing
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});

	it('should render message box when error messages are provided', () => {
		const messages = [
			{
				text: 'Failed verify account. Please try again!',
				severity: 'error' as const,
			},
		];

		render(<VerifyAccount messages={messages} />);

		// The MessageBox component should be present
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('should render message box when success messages are provided', () => {
		const messages = [
			{
				text: 'Account verified successfully',
				severity: 'success' as const,
			},
		];

		render(<VerifyAccount messages={messages} />);

		// The MessageBox component should be present
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('should render message box when info messages are provided', () => {
		const messages = [
			{
				text: 'Confirmation token is not valid',
				severity: 'info' as const,
			},
		];

		render(<VerifyAccount messages={messages} />);

		// The MessageBox component should be present
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<VerifyAccount />)).not.toThrow();
	});
});
