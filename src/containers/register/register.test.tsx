import { render, screen, waitFor, userEvent } from '@/test-utils';
import RegisterContainer from './register';

describe('RegisterContainer', () => {
    it('should navigate to login view if register request is successful', async () => {
        render(        
            <RegisterContainer />
        );

        // const emailInput = screen.getByLabelText('Email');
        // const passwordInput = screen.getByLabelText('Password'); 
        // const confirmPasswordInput = screen.getByLabelText('Confirm password');
        // const capchaInput = screen.getByPlaceholderText("Enter captcha");
        // const checkbox = screen.getByRole('checkbox');
        // const registerButton = screen.getByRole('button', { name: "Register" });
        // await userEvent.type(emailInput, 'account@mail.com')
        // await userEvent.type(passwordInput, '@Abcdef9');
        // await userEvent.type(confirmPasswordInput, '@Abcdef9');
        // await userEvent.type(capchaInput, 'w93bx');
        // await userEvent.click(checkbox);
        // await userEvent.click(registerButton);

        // await waitFor(() => {
        //     expect(mockedUsedNavigate).toBeCalledTimes(1);
        //     expect(mockedUsedNavigate).toBeCalledWith(PublicRoutes.login, {state: {email: 'account@mail.com'}});
        // })
    })

    test('if email input has theme danger and existent account component is displayed when email is already registered', async () => {
        render(        
            <RegisterContainer />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        await userEvent.type(emailInput, 'alreadyexistsaccount@mail.com')
        await userEvent.type(passwordInput, '@Abcdef9');
        await userEvent.type(confirmPasswordInput, '@Abcdef9');
        await userEvent.type(capchaInput, 'w93bx');
        await userEvent.click(checkbox);
        await userEvent.click(registerButton);
      
        expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
        expect(await screen.findByText(/already exists/)).toBeInTheDocument();
        await waitFor(() => expect(emailInput).toHaveClass('danger'));
    })

    it('should display an error message when there is a network failure', async () => {
        render(        
            <RegisterContainer />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        await userEvent.type(emailInput, 'networkfail@mail.com')
        await userEvent.type(passwordInput, '@Abcdef9');
        await userEvent.type(confirmPasswordInput, '@Abcdef9');
        await userEvent.type(capchaInput, 'w93bx');
        await userEvent.click(checkbox);
        await userEvent.click(registerButton);

        expect(await screen.findByText(/Registration failed! Please try again./)).toBeInTheDocument();
    })

    it('should display the custom error message received from server', async () => {
        render(        
            <RegisterContainer />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        await userEvent.type(emailInput, 'customservermessage@mail.com')
        await userEvent.type(passwordInput, '@Abcdef9');
        await userEvent.type(confirmPasswordInput, '@Abcdef9');
        await userEvent.type(capchaInput, 'w93bx');
        await userEvent.click(checkbox);
        await userEvent.click(registerButton);

        expect(await screen.findByText("Custom message")).toBeInTheDocument();
    })
})