import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResendConfirmationEmailContainer from './resend-confirmation-email';
import { MemoryRouter } from 'react-router-dom';

describe('ResendConfirmationEmailContainer', () => {
    test('it should display reset email sent message if reset email request is succesful', async () => {
        render(        
            <MemoryRouter>
                <ResendConfirmationEmailContainer />
            </MemoryRouter>
        );
        const emailInput = screen.getByLabelText('Email');
        userEvent.type(emailInput, "pass@mail.com");
        const sendButton = screen.getByRole('button', { name: "Resend confirmation email" });
        userEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/A confirmation email has been sent to/)).toBeInTheDocument();
        })
    });

    test('if email input has theme danger and inexistent account component is displayed when email is not registered', async () => {
        render(        
            <MemoryRouter>
                <ResendConfirmationEmailContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        userEvent.type(emailInput, "inexistentaccount@mail.com");
        const sendButton = screen.getByRole('button', { name: "Resend confirmation email" });
        userEvent.click(sendButton);
      
        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
        expect(await screen.findByText(/has been found/)).toBeInTheDocument();
        await waitFor(() => {
            expect(emailInput).toHaveClass('danger');
        });
    })

    test('if account not active component is displayed when account exists but it is not active', async () => {
        render(        
            <MemoryRouter>
                <ResendConfirmationEmailContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        userEvent.type(emailInput, "accountnotactive@mail.com");
        const sendButton = screen.getByRole('button', { name: "Resend confirmation email" });
        userEvent.click(sendButton);
      
        expect(await screen.findByText(/An account with the email/)).toBeInTheDocument();
        expect(await screen.findByText(/exists, but it is not active./)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: "Resend confirmation email" })).not.toBeInTheDocument();
    })

    it('should display the custom error message received from server', async () => {
        render(        
            <MemoryRouter>
                <ResendConfirmationEmailContainer />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        userEvent.type(emailInput, "customservermessage@mail.com");
        const sendButton = screen.getByRole('button', { name: "Resend confirmation email" });
        userEvent.click(sendButton);

        expect(await screen.findByText("Custom message")).toBeInTheDocument();
    })
})