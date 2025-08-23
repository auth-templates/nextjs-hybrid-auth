import SignupForm from './signup-form';
import { render, screen, waitFor, userEvent } from '@/test-utils';

describe('SignupForm', () => {
	it('should contain all elements', () => {
		render(<SignupForm onSubmit={jest.fn()} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		const email = screen.getByLabelText('Email:');
		expect(email).toBeInTheDocument();
		expect(email).toHaveAttribute('type', 'email');
		const password = screen.getByLabelText('Password:');
		expect(password).toBeInTheDocument();
		expect(password).toHaveAttribute('type', 'password');
		const confirmPassword = screen.getByLabelText('Confirm password:');
		expect(confirmPassword).toBeInTheDocument();
		expect(confirmPassword).toHaveAttribute('type', 'password');
		const signupButton = screen.getByRole('button', { name: 'Sign up' });
		expect(signupButton).toBeInTheDocument();
		expect(signupButton).toHaveAttribute('type', 'submit');
		expect(screen.getByText(/Already have an account?/)).toBeInTheDocument();
		const linkSignUp = screen.getByRole('link', { name: 'Login' });
		expect(linkSignUp).toBeInTheDocument();
		expect(linkSignUp).toHaveAttribute('href', '/login');
		expect(screen.getByRole('link', { name: /Sign up with GitHub/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Sign up with Google/ })).toBeInTheDocument();
	});

	it('displays errors when fields do not have values', async () => {
		render(<SignupForm onSubmit={jest.fn()} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		await userEvent.click(await screen.findByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(
				screen.getByText(
					'Your password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol, and one number.'
				)
			).toBeInTheDocument();
			expect(screen.getByText('You must accept the terms and conditions.')).toBeInTheDocument();
			expect(screen.getByText('Invalid email address')).toBeInTheDocument();
		});
	});

	it('calls onSubmit with the gathered data', async () => {
		const onSubmit = jest.fn();

		render(<SignupForm onSubmit={onSubmit} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		const data = {
			email: 'user@email.com',
			password: 'Passw!or34d',
			termsAccepted: true,
		};

		await userEvent.type(screen.getByLabelText('Email:'), data.email);
		await userEvent.type(screen.getByLabelText('Password:'), data.password);
		await userEvent.type(screen.getByLabelText('Confirm password:'), data.password);
		await userEvent.click(screen.getByRole('checkbox'));

		await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(screen.getByRole('checkbox')).toBeChecked();

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith(data);
		});
	}, 10000);

	it('displays error message when email is invalid', async () => {
		render(<SignupForm onSubmit={jest.fn()} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		await userEvent.type(screen.getByLabelText('Email:'), 'user@gmail');
		await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
	});

	it("displays error message when password doesn't meet the rules", async () => {
		render(<SignupForm onSubmit={jest.fn()} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		await userEvent.type(screen.getByLabelText('Password:'), '111');
		await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(
			screen.getByText(
				'Your password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol, and one number.'
			)
		).toBeInTheDocument();
	});

	it('displays error message when passwords do not match', async () => {
		render(<SignupForm onSubmit={jest.fn()} />, {
			pickedMessages: ['forms.register', 'forms.terms', 'forms.social-auth'],
		});

		await userEvent.type(screen.getByLabelText('Email:'), 'user@gmail.com');
		await userEvent.type(screen.getByLabelText('Password:'), 'Passw!or34d');
		await userEvent.type(screen.getByLabelText('Confirm password:'), 'Pass');

		await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
		});
	});
});
