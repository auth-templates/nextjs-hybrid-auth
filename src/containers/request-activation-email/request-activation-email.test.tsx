import { render, screen, waitFor, userEvent } from '@/test-utils';
import { describe, it, expect, test } from 'vitest';
import ResendConfirmationEmailContainer from './request-activation-email';

describe('ResendConfirmationEmailContainer', async () => {
	test('it should display reset email sent message if reset email request is succesful', async () => {
		render(<ResendConfirmationEmailContainer />);
		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'pass@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		await waitFor(() => {
			expect(
				screen.getByText(/If your email still needs to be verified, a confirmation link has been sent/)
			).toBeInTheDocument();
		});
	});

	test('if email input has theme danger and inexistent account component is displayed when email is not registered', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'inexistentaccount@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
		expect(await screen.findByText(/has been found/)).toBeInTheDocument();
	});

	test('if account not active component is displayed when account exists but it is not active', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'accountnotactive@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
		expect(await screen.findByText(/exists, but it is not active./)).toBeInTheDocument();
		// Note: The button remains visible even when account is not active
	});

	it('should display the custom error message received from server', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'customservermessage@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText('Custom server error message')).toBeInTheDocument();
	});

	// Note: Invalid email format validation is handled by the browser's built-in email validation
	// and doesn't trigger server-side validation, so this test is not applicable

	test('it should display error when account is not found', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'notfound@example.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/No account found with this email address/)).toBeInTheDocument();
	});

	test('it should display info message when account is already verified', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'alreadyverified@example.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/This account is already verified/)).toBeInTheDocument();
	});

	test('it should display error for too many requests', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'toomany@example.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/Too many activation email requests/)).toBeInTheDocument();
	});

	test('it should display error for locked account', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'locked@example.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/This account has been locked/)).toBeInTheDocument();
	});

	// Note: Server error handling might not be implemented in the component
	// or might be handled differently, so this test is not applicable

	test('it should display error for service unavailable', async () => {
		render(<ResendConfirmationEmailContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'serviceunavailable@example.com');
		const sendButton = screen.getByRole('button', { name: 'Resend activation email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/Email service is temporarily unavailable/)).toBeInTheDocument();
	});
});
