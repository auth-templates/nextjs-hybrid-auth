import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConfirmationEmailExpired from './confirmation-email-expired';
import { PublicRoutes } from '../../routes';

describe("ConfirmationEmailExpired", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <ConfirmationEmailExpired />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your account confirmation email has expired. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', {name: 'Resend confirmation email'})).toHaveAttribute('href', PublicRoutes.resendConfirmationEmail);
        expect(screen.getByText(/page in order to send a new mail./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ConfirmationEmailExpired /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});