import { render, screen, userEvent } from '@/test-utils';
import LoginContainer from './login';

describe('LoginContainer', () => {
    test('it should navigate to dashboard view if login request is succesful', async () => {
        render(        
            <LoginContainer />
        );
        // const email = screen.getByLabelText('Email');
        // await userEvent.type(email, "pass@mail.com");
        // const password = screen.getByLabelText('Password');
        // await userEvent.type(password, "password");
        // const loginButton = screen.getByRole('button', { name: 'Login'});
        // await userEvent.click(loginButton);
 
    });

    test('it should display an error message when csrf token is a not valid', async () => {
        render(        
            <LoginContainer />
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "badcsrftoken@mail.com");
        const password = screen.getByLabelText('Password');
        await userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        await userEvent.click(loginButton);

        expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
    });

    test('it should display an error message when there is a network failure', async () => {
        render(        
            <LoginContainer />
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "networkfail@mail.com");
        const password = screen.getByLabelText('Password');
        await userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        await userEvent.click(loginButton);

        expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
    });

    test('it should display an error message when email is invalid', async () => {
        render(        
            <LoginContainer />
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "invalidaccount@mail.com");
        const password = screen.getByLabelText('Password');
        await userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        await userEvent.click(loginButton);

        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
    });

    test('it should display an error message when password is invalid', async () => {
        render(        
            <LoginContainer />
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "invalidpassword@mail.com");
        const password = screen.getByLabelText('Password');
        await userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        await userEvent.click(loginButton);

        expect(await screen.findByText(/Password is invalid/)).toBeInTheDocument();
    });
})