import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { PublicRoutes } from '../../routes';
import RecoverPassword from './recover-password';

describe("RecoverPassword", () => {
    it('should contain all elements', () => {
        render(
            <MemoryRouter>
                <RecoverPassword onSend={jest.fn()}/>
            </MemoryRouter>
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
            <MemoryRouter>
                <RecoverPassword onSend={mockOnSend}/>
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "account@mail.com");

        const sendButton = screen.getByRole('button', { name: "Send reset password email"});
        await userEvent.click(sendButton);
        expect(mockOnSend).toBeCalledTimes(1);
        expect(mockOnSend).toBeCalledWith({email:"account@mail.com"});    
    });

    it('input email should have theme danger when email is invalid', async () => {
        render(        
            <MemoryRouter>
                <RecoverPassword status={{theme: 'error', lines:['Email is invalid'] }} onSend={jest.fn()}/>
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
    });

    it('email input should have theme normal when email is invalid and email input got focused', async () => {
        render(        
            <MemoryRouter>
                <RecoverPassword status={{theme: 'error', lines:['Email is invalid']}} onSend={jest.fn()}/>
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        expect(email).toHaveClass('danger');
        await userEvent.click(email);
        expect(email).toHaveClass('normal');
    });

    it('displays InexistentAccount component when email is invalid', async () => {
        render(
            <MemoryRouter>
                <RecoverPassword status={{theme: 'error', lines:['Email is invalid']}} onSend={jest.fn()}/>
            </MemoryRouter>
        );
        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
    });

    it("renders correctly with default props", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <RecoverPassword onSend={jest.fn()}/>
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
