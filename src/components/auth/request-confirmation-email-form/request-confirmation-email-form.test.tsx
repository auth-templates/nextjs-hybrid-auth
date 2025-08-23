import { render, screen, userEvent } from '@/test-utils';
import ResendConfirmationEmail from './request-confirmation-email-form';
import { PublicRoutes } from '@/routes';

describe('ResendConfirmationEmail', () => {
	it('should contain all elements', () => {
		render(
			<ResendConfirmationEmail
				onResend={jest.fn()}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		const email = screen.getByLabelText('Email');
		expect(email).toBeInTheDocument();
		expect(email).toHaveAttribute('required');
		expect(screen.getByText(/or go back to/)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Sign in/ })).toHaveAttribute('href', PublicRoutes.login);
		expect(screen.getByRole('button', { name: 'Resend confirmation email' })).toBeInTheDocument();
	});

	test('onResend callback receives the correct arguments', async () => {
		const mockOnResend = jest.fn();
		render(
			<ResendConfirmationEmail
				onResend={mockOnResend}
				status={{
					theme: '',
					lines: [],
				}}
			/>
		);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'account@mail.com');

		const sendButton = screen.getByRole('button', { name: 'Resend confirmation email' });
		await userEvent.click(sendButton);
		expect(mockOnResend).toBeCalledTimes(1);
		expect(mockOnResend).toBeCalledWith({ email: 'account@mail.com' });
	});

	it('input email should have theme danger when email is invalid', async () => {
		render(
			<ResendConfirmationEmail status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={jest.fn()} />
		);
		const email = screen.getByLabelText('Email');
		expect(email).toHaveClass('danger');
	});

	it('email input should have theme normal when email is invalid and email input got focused', async () => {
		render(
			<ResendConfirmationEmail status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={jest.fn()} />
		);
		const email = screen.getByLabelText('Email');
		expect(email).toHaveClass('danger');
		await userEvent.click(email);
		expect(email).toHaveClass('normal');
	});

	it('displays InexistentAccount component when email is invalid', async () => {
		render(
			<ResendConfirmationEmail status={{ theme: 'error', lines: ['Email is invalid'] }} onResend={jest.fn()} />
		);
		expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
	});

	it('displays ConfirmationEmailSent component when received message is "Confirmation email sent"', async () => {
		render(
			<ResendConfirmationEmail
				status={{ theme: 'error', lines: ['Confirmation email sent'] }}
				onResend={jest.fn()}
			/>
		);
		expect(await screen.findByText(/A confirmation email has been sent to/)).toBeInTheDocument();
	});

	it('displays AccountNotActive component when resend request is "Email is not verified"', async () => {
		render(
			<ResendConfirmationEmail
				status={{ theme: 'error', lines: ['Email is not verified'] }}
				onResend={jest.fn()}
			/>
		);
		expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
		expect(await screen.findByText(/exists, but it is not active./)).toBeInTheDocument();
	});
});
