import userEvent from '@testing-library/user-event';
import SignupForm from './signup-form';
import mockRouter from 'next-router-mock';
import { render, screen, waitFor } from '@/test-utils';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));   

describe("SignupForm", () => {
    it('should contain all elements', () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        const email = screen.getByLabelText('Email:');
        expect(email).toBeInTheDocument();
        expect(email).toHaveAttribute('type', 'email');
        const password = screen.getByLabelText('Password:');
        expect(password).toBeInTheDocument();
        expect(password).toHaveAttribute('type', 'password');
        const confirmPassword = screen.getByLabelText('Confirm password:');
        expect(confirmPassword).toBeInTheDocument();
        expect(confirmPassword).toHaveAttribute('type', 'password');
        const loginButton = screen.getByRole('button', { name: 'Sign up'});
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveAttribute('type', 'submit');
        expect(screen.getByText(/Already have an account?/)).toBeInTheDocument();
        const linkSignUp = screen.getByRole('link', {name: 'Login'});
        expect(linkSignUp).toBeInTheDocument();
        expect(linkSignUp).toHaveAttribute('href', '/login');
        expect(screen.getByRole('link', {name: /Login with Github/})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Login with Google/})).toBeInTheDocument();
    });

    it('displays error message when email is not provided', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        })
    });
    
    it('displays error message when password is not provided', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        })
    });

    it('displays error message when confirm password is not provided', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
        await waitFor(() => {
            expect(screen.getByText('Confirming your password is required')).toBeInTheDocument();
        })
    });

    it('makes a redirect to dashboard page after successful login', async () => {
        mockRouter.push("/signup");

        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );
  
        await userEvent.type(screen.getByLabelText('Email:'), "user@gmail.com");
        await userEvent.type(screen.getByLabelText('Password:'), "Passw!or34d");
        await userEvent.type(screen.getByLabelText('Confirm password:'), "Passw!or34d");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
        await waitFor(() => {
            expect(mockRouter).toMatchObject({ 
                asPath: "/dashboard",
                pathname: "/dashboard",
            });
        })
    }, 10000);

    it('displays error message when email is invalid', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.type(screen.getByLabelText('Email:'), "user@gmail");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    });
    
    it('displays error message when password doesn\'t meet the rules', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.type(screen.getByLabelText('Password:'), "111");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        expect(await screen.findByText(PasswordRulesText)).toBeInTheDocument();
    });

    it('displays error message when confirm password do not match password', async () => {
        render(
            <SignupForm 
                onSubmit={jest.fn()}
            />,
            {
                pickedMessages: ['forms.register']
            }
        );

        await userEvent.type(screen.getByLabelText('Password:'), "Passw!or34d");
        await userEvent.type(screen.getByLabelText('Confirm password:'), "Passw!or34");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        expect(await screen.findByText("Passwords do no match")).toBeInTheDocument();
    });
});
