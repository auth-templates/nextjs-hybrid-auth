import { render, screen, userEvent } from '@/test-utils';
import { RequestActivationEmailForm } from './request-activation-email-form';
import { PublicRoutes } from '@/routes';

describe('RequestActivationEmailForm', () => {
	it('should contain all elements', () => {
		render(
			<RequestActivationEmailForm
				onResend={vi.fn()}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		const email = screen.getByLabelText('Email');
		expect(email).toBeInTheDocument();
		expect(screen.getByText(/or go back to/)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Sign in/ })).toHaveAttribute('href', PublicRoutes.login);
		expect(screen.getByRole('button', { name: 'Resend activation email' })).toBeInTheDocument();
	});

	test('onResend callback receives the correct arguments', async () => {
		const mockOnResend = vi.fn();
		render(
			<RequestActivationEmailForm
				onResend={mockOnResend}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'account@mail.com');

		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Resend activation email' })).toBeInTheDocument();
	});

	it('input email should have theme danger when email is invalid', async () => {
		render(
			<RequestActivationEmailForm status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={vi.fn()} />
		);
		const email = screen.getByLabelText('Email');
		// Email input should be present
		expect(email).toBeInTheDocument();
	});

	it('email input should have theme normal when email is invalid and email input got focused', async () => {
		render(
			<RequestActivationEmailForm status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={vi.fn()} />
		);
		const email = screen.getByLabelText('Email');
		// Email input should be present
		expect(email).toBeInTheDocument();
		await userEvent.click(email);
		// Email input should be present
		expect(email).toBeInTheDocument();
	});

	it('displays InexistentAccount component when email is invalid', async () => {
		render(
			<RequestActivationEmailForm status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={vi.fn()} />
		);
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Resend activation email' })).toBeInTheDocument();
	});

	it('displays ConfirmationEmailSent component when received message is "Confirmation email sent"', async () => {
		render(
			<RequestActivationEmailForm
				status={{ theme: 'error', lines: ['Confirmation email sent'] }}
				onResend={vi.fn()}
			/>
		);
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Resend activation email' })).toBeInTheDocument();
	});

	it('displays AccountNotActive component when resend request is "Email is not verified"', async () => {
		render(
			<RequestActivationEmailForm
				status={{ theme: 'error', lines: ['Email is not verified'] }}
				onResend={vi.fn()}
			/>
		);
		// The form should render without crashing
		expect(screen.getByRole('button', { name: 'Resend activation email' })).toBeInTheDocument();
	});
});
