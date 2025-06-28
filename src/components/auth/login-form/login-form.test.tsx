import { render, screen, waitFor, userEvent } from '@/test-utils';
import LoginForm from './login-form';

describe("LoginForm", () => {
    it('should contain all elements', () => {
        render(
            <LoginForm onSubmit={jest.fn()} />,
            {
                pickedMessages: ['forms.login', 'forms.social-auth']
            }
        );

        const email = screen.getByLabelText('Email:');
        expect(email).toBeInTheDocument();
        expect(email).toHaveAttribute('type', 'email');
        const password = screen.getByLabelText('Password:');
        expect(password).toBeInTheDocument();
        expect(password).toHaveAttribute('type', 'password');
        const loginButton = screen.getByRole('button', { name: 'Login'});
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveAttribute('type', 'submit');
        const linkForgotPassword = screen.getByRole('link', {name: 'Forgot password?'});
        expect(linkForgotPassword).toBeInTheDocument();
        expect(linkForgotPassword).toHaveAttribute('href', '/recover-password');
        expect(screen.getByText(/Don't have an account?/)).toBeInTheDocument();
        const linkSignUp = screen.getByRole('link', {name: 'Sign up'});
        expect(linkSignUp).toBeInTheDocument();
        expect(linkSignUp).toHaveAttribute('href', '/signup');
        expect(screen.getByRole('link', {name: /Login with GitHub/})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Login with Google/})).toBeInTheDocument();
    });

    it('displays error messages when fields are empty', async () => {
        render(        
            <LoginForm onSubmit={jest.fn } />,
            {
                pickedMessages: ['forms.login', 'forms.social-auth']
            }
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        })
    });
    
    it('displays error message when email is invalid', async () => {
        render(        
            <LoginForm onSubmit={jest.fn()} />,
            {
                pickedMessages: ['forms.login', 'forms.social-auth']
            }
        );

   
        await userEvent.type(screen.getByLabelText('Email:'), "user@gmail");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    });
});
