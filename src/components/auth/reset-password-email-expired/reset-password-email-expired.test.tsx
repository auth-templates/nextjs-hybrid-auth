import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ResetPasswordEmailExpired from './reset-password-email-expired';
import { PublicRoutes } from '../../../routes';

describe("ResetPasswordEmailExpired", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <ResetPasswordEmailExpired />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', {name: 'Forgot password'})).toHaveAttribute('href', PublicRoutes.recoverPassword);
        expect(screen.getByText(/page in order to send a new mail./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ResetPasswordEmailExpired /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});