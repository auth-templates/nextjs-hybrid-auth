import { findByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import RegisterContainer from './register';
import { PrivateRoutes, PublicRoutes } from '../../routes';
import { MemoryRouter } from 'react-router-dom';;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('RegisterContainer', () => {
    it('should navigate to login view if register request is successful', async () => {
        render(        
            <MemoryRouter>
                <RegisterContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'account@mail.com')
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef9');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        await waitFor(() => {
            expect(mockedUsedNavigate).toBeCalledTimes(1);
            expect(mockedUsedNavigate).toBeCalledWith(PublicRoutes.login, {state: {email: 'account@mail.com'}});
        })
    })

    test('if email input has theme danger and existent account component is displayed when email is already registered', async () => {
        render(        
            <MemoryRouter>
                <RegisterContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'alreadyexistsaccount@mail.com')
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef9');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

      
        expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
        expect(await screen.findByText(/already exists/)).toBeInTheDocument();
        await waitFor(() => expect(emailInput).toHaveClass('danger'));
    })

    it('should display an error message when there is a network failure', async () => {
        render(        
            <MemoryRouter>
                <RegisterContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'networkfail@mail.com')
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef9');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        expect(await screen.findByText(/Registration failed! Please try again./)).toBeInTheDocument();
    })

    it('should display the custom error message received from server', async () => {
        render(        
            <MemoryRouter>
                <RegisterContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'customservermessage@mail.com')
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef9');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        expect(await screen.findByText("Custom message")).toBeInTheDocument();
    })
})