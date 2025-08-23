import { render, screen, userEvent, waitFor } from '@/test-utils';
import LoginContainer from './login';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('LoginContainer', () => {
	it('makes a redirect to dashboard page after successful login', async () => {
		render(<LoginContainer />);

		await userEvent.type(screen.getByLabelText('Email:'), 'user@gmail.com');
		await waitFor(() => {
			expect(screen.getByLabelText('Email:')).toHaveValue('user@gmail.com');
		});

		await userEvent.type(screen.getByLabelText('Password:'), 'password');
		await waitFor(() => {
			expect(screen.getByLabelText('Password:')).toHaveValue('password');
		});

		await userEvent.click(screen.getByRole('button', { name: 'Login' }));
		await waitFor(() => {
			expect(mockRouter).toMatchObject({
				asPath: '/dashboard',
				pathname: '/dashboard',
			});
		});
	}, 10000);

	test('it should display an error message when csrf token is a not valid', async () => {
		render(<LoginContainer />);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'badcsrftoken@mail.com');
		const password = screen.getByLabelText('Password');
		await userEvent.type(password, 'password');
		const loginButton = screen.getByRole('button', { name: 'Login' });
		await userEvent.click(loginButton);

		expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
	});

	test('it should display an error message when there is a network failure', async () => {
		mockRouter.push('/login');

		render(<LoginContainer />);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'networkfail@mail.com');
		const password = screen.getByLabelText('Password');
		await userEvent.type(password, 'password');
		const loginButton = screen.getByRole('button', { name: 'Login' });
		await userEvent.click(loginButton);

		expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
	});

	test('it should display an error message when email is invalid', async () => {
		render(<LoginContainer />);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'invalidaccount@mail.com');
		const password = screen.getByLabelText('Password');
		await userEvent.type(password, 'password');
		const loginButton = screen.getByRole('button', { name: 'Login' });
		await userEvent.click(loginButton);

		expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
	});

	test('it should display an error message when password is invalid', async () => {
		render(<LoginContainer />);
		const email = screen.getByLabelText('Email');
		await userEvent.type(email, 'invalidpassword@mail.com');
		const password = screen.getByLabelText('Password');
		await userEvent.type(password, 'password');
		const loginButton = screen.getByRole('button', { name: 'Login' });
		await userEvent.click(loginButton);

		expect(await screen.findByText(/Password is invalid/)).toBeInTheDocument();
	});
});
