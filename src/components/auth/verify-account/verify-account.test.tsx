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
				theme: 'error' as const,
				lines: ['Failed verify account. Please try again!'],
			},
		];

		render(<VerifyAccount messages={messages} />);

		// The MessageBox component should be present
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('should render account verified component when account is verified', () => {
		const messages = [
			{
				theme: 'info' as const,
				lines: ['Account verified'],
			},
		];

		render(<VerifyAccount messages={messages} />);

		expect(screen.getByText(/Your account has been verified successfully/)).toBeInTheDocument();
	});

	it('should render confirmation email expired component when token is invalid', () => {
		const messages = [
			{
				theme: 'error' as const,
				lines: ['Confirmation token is not valid'],
			},
		];

		render(<VerifyAccount messages={messages} />);

		expect(screen.getByText(/Your account confirmation email has expired/)).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<VerifyAccount />)).not.toThrow();
	});
});
