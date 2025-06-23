import { render, screen, userEvent } from '@/test-utils';
import Login from './login';

describe("Login", () => {
    it('should contain all elements', () => {
        render(
            <Login onLogin={jest.fn()} status={{
                theme: '',
                lines: []
            }}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toBeInTheDocument();
        expect(email).toHaveAttribute('required');
        expect(email).toHaveAttribute('type', 'email');
        const password = screen.getByLabelText('Password');
        expect(password).toBeInTheDocument();
        expect(password).toHaveAttribute('required');
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        const loginButton = screen.getByRole('button', { name: 'Login'});
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveAttribute('type', 'submit');
        const linkForgotPassword = screen.getByRole('link', {name: 'Forgot your password?'});
        expect(linkForgotPassword).toBeInTheDocument();
        expect(linkForgotPassword).toHaveAttribute('href', '/recover-password');
        const linkSignUp = screen.getByRole('link', {name: 'Sign Up'});
        expect(linkSignUp).toBeInTheDocument();
        expect(linkSignUp).toHaveAttribute('href', '/sign-up');
        const resendConfirmation = screen.getByRole('link', {name: 'Resend confirmation email'});
        expect(resendConfirmation).toBeInTheDocument();
        expect(resendConfirmation).toHaveAttribute('href', '/resend-confirmation-email');
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.queryByText('Email or password is incorrect!')).not.toBeInTheDocument();
    });

    test('onLogin callback receives the correct arguments', async () => {
        const mockOnLogin = jest.fn();
        render(        
            <Login onLogin={mockOnLogin} status={{
                theme: '',
                lines: []
            }}/>
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "user@gmail.com");
        const password = screen.getByLabelText('Password');
        await userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        await userEvent.click(loginButton);
        expect(mockOnLogin).toBeCalledTimes(1);
        expect(mockOnLogin).toBeCalledWith({email:"user@gmail.com", password:"password"});    
    });

    it('input email should have theme danger when email is invalid', async () => {
        render(        
            <Login status={{theme: 'error', lines:['Email is invalid'] }} onLogin={jest.fn()}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
    });

    it('input password should have theme danger when password is invalid', async () => {
        render(        
            <Login status={{theme: 'error', lines:['Password is invalid'] }} onLogin={jest.fn()}/>
        );
        const password = screen.getByLabelText('Password');
        expect(password).toHaveClass('danger');
    });

    it('email input should have theme normal when email is invalid and email input got focused', async () => {
        render(        
            <Login status={{theme: 'error', lines:['Email is invalid']}} onLogin={jest.fn()}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
        await userEvent.click(email);
        expect(email).toHaveClass('normal');
    });

    it('password input should have theme normal when password is invalid and password input got focused', async () => {
        render(        
            <Login status={{theme: 'error', lines:['Password is invalid']}} onLogin={jest.fn()}/>
        );
        const password = screen.getByLabelText('Password');
        expect(password).toHaveClass('danger');
        await userEvent.click(password);
        expect(password).toHaveClass('normal');
    });

    it('displays InexistentAccount component when email is invalid', async () => {
        render(
            <Login status={{theme: 'error', lines:['Email is invalid']}} onLogin={jest.fn()}/>
        );
        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
    });

    it('displays "Password is invalid" message when password is invalid', async () => {
        render(
            <Login status={{theme: 'error', lines:['Password is invalid']}} onLogin={jest.fn()}/>
        );
        expect(await screen.findByText(/Password is invalid/)).toBeInTheDocument();
    });
});
