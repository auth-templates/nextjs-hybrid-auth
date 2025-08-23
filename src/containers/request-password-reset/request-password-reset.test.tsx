import { render, screen, waitFor, userEvent } from '@/test-utils';
import RequestPasswordResetContainer from './request-password-reset';

describe('RequestPasswordResetContainer', () => {
	test('it should display reset email sent message if reset email request is succesful', async () => {
		render(<RequestPasswordResetContainer />);
		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'pass@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });
		await userEvent.click(sendButton);

		await waitFor(() => {
			expect(screen.getByText(/An email with reset password intructions has been sent to/)).toBeInTheDocument();
		});
	});

	test('if email input has theme danger and inexistent account component is displayed when email is not registered', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'inexistentaccount@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
		expect(await screen.findByText(/has been found/)).toBeInTheDocument();
		await waitFor(() => {
			expect(emailInput).toHaveClass('danger');
		});
	});

	test('if account not active component is displayed when account exists but it is not active', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'accountnotactive@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
		expect(await screen.findByText(/exists, but it is not active./)).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Send reset password email' })).not.toBeInTheDocument();
	});

	it('should display the custom error message received from server', async () => {
		render(<RequestPasswordResetContainer />);

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'customservermessage@mail.com');
		const sendButton = screen.getByRole('button', { name: 'Send reset password email' });
		await userEvent.click(sendButton);

		expect(await screen.findByText('Custom message')).toBeInTheDocument();
	});
});
