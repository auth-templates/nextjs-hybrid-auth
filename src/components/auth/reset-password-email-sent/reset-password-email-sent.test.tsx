import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ResetPasswordEmailSent from './reset-password-email-sent';
import { PublicRoutes } from '../../../routes';

describe("ResetPasswordEmailSent", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <ResetPasswordEmailSent email={'account@mail.com'} />
            </MemoryRouter>
        );

        expect(screen.getByText(/An email with reset password intructions has been sent to/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/and it should arrive soon. Please check your inbox./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ResetPasswordEmailSent email={'account@mail.com'} /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});