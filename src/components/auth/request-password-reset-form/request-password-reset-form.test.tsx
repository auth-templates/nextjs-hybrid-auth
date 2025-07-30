import { render, screen, userEvent } from '@/test-utils';
import RequestPasswordResetForm from './request-password-reset-form';
import { PublicRoutes } from '@/routes';

describe("RequestPasswordResetForm", () => {
    it('should contain all elements', () => {
        render(
            <RequestPasswordResetForm onSend={jest.fn()} status={{
                theme: '',
                lines: []
            }}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toBeInTheDocument();
        expect(email).toHaveAttribute('required');
        expect(screen.getByText(/or go back to/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Sign in/ })).toHaveAttribute('href', PublicRoutes.login);
        expect(screen.getByRole('button', { name: "Send reset password email" })).toBeInTheDocument();
    });

    test('onSend callback receives the correct arguments', async () => {
        const mockOnSend= jest.fn();
        render(        
            <RequestPasswordResetForm onSend={mockOnSend} status={{
                theme: '',
                lines: []
            }}/>
        );
        const email = screen.getByLabelText('Email');
        await userEvent.type(email, "account@mail.com");

        const sendButton = screen.getByRole('button', { name: "Send reset password email"});
        await userEvent.click(sendButton);
        expect(mockOnSend).toBeCalledTimes(1);
        expect(mockOnSend).toBeCalledWith({email:"account@mail.com"});    
    });

    it('input email should have theme danger when email is invalid', async () => {
        render(        
            <RequestPasswordResetForm status={{theme: 'error', lines:['Email is invalid'] }} onSend={jest.fn()}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
    });

    it('email input should have theme normal when email is invalid and email input got focused', async () => {
        render(        
            <RequestPasswordResetForm status={{theme: 'error', lines:['Email is invalid']}} onSend={jest.fn()}/>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
        await userEvent.click(email);
        expect(email).toHaveClass('normal');
    });

    it('displays InexistentAccount component when email is invalid', async () => {
        render(
            <RequestPasswordResetForm status={{theme: 'error', lines:['Email is invalid']}} onSend={jest.fn()}/>
        );
        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
    });
});
