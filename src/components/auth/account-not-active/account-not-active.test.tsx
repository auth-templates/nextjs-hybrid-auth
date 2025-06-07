import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AccountNotActive from './account-not-active';
import { PublicRoutes } from '../../../routes';

describe("AccountNotActive", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <AccountNotActive email={'account@mail.com'} />
            </MemoryRouter>
        );

        expect(screen.getByText(/An account with the email/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/exists, but it is not active./)).toBeInTheDocument();
        expect(screen.getByText(/Check your inbox for the confirmation email or please go to/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Resend confirmation email' })).toHaveAttribute('href', PublicRoutes.resendConfirmationEmail);
        expect(screen.getByText(/page in order to send a new confirmation email./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <AccountNotActive email={'account@mail.com'} /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});