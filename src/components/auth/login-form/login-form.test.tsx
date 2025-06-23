import { render, screen, waitFor, userEvent } from '@/test-utils';
import LoginForm from './login-form';
import { MantineProvider } from '@mantine/core';
import mockRouter from 'next-router-mock';

jest.mock('../../api/auth', () => {return {...jest.requireActual('../../api/auth'), login: jest.fn()}});
jest.mock('next/router', () => jest.requireActual('next-router-mock'));   

describe("LoginForm", () => {
    it('should contain all elements', () => {
        render(
            <MantineProvider>
                <LoginForm onSubmit={function (data: any): void {
                    throw new Error('Function not implemented.');
                } } />
            </MantineProvider>
        );

        expect(screen.getByRole('heading', { name: 'Login'})).toBeInTheDocument();
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
        expect(screen.getByRole('link', {name: /Login with Facebook/})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Login with Google/})).toBeInTheDocument();
    });

    it('displays error message when email is not provided', async () => {
        render(        
            <MantineProvider>
                <LoginForm onSubmit={function (data: any): void {
                    throw new Error('Function not implemented.');
                } } />
            </MantineProvider>
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        })
    });

    it('displays error message when password is not provided', async () => {
        render(        
            <MantineProvider>
                <LoginForm onSubmit={function (data: any): void {
                    throw new Error('Function not implemented.');
                } } />
            </MantineProvider>
        );

        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        })
    });


    it('makes a redirect to dashboard page after successful login', async () => {
        mockRouter.push("/login");

        render(        
            <MantineProvider>
                <LoginForm onSubmit={function (data: any): void {
                    throw new Error('Function not implemented.');
                } } />
            </MantineProvider>
        );
  
        await userEvent.type(screen.getByLabelText('Email:'), "user@gmail.com");
        await waitFor(() => {
            expect(screen.getByLabelText('Email:')).toHaveValue("user@gmail.com");
        })   

        await userEvent.type(screen.getByLabelText('Password:'), "password");
        await waitFor(() => {
            expect(screen.getByLabelText('Password:')).toHaveValue("password");
        })

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
            <MantineProvider>
                <LoginForm onSubmit={function (data: any): void {
                    throw new Error('Function not implemented.');
                } } />
            </MantineProvider>
        );

   
        await userEvent.type(screen.getByLabelText('Email:'), "user@gmail");
        await userEvent.click(screen.getByRole('button', { name: 'Login'}));
    
        expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    });
});
