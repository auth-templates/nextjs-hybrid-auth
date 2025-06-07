import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ExistentAccount from './existent-account';
import { PublicRoutes } from '../../routes';

describe("ExistentAccount", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <ExistentAccount email={'account@mail.com'} />
            </MemoryRouter>
        );

        expect(screen.getByText(/An account with the email/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/already exists. Please go to/)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Sign in'})).toHaveAttribute('href', PublicRoutes.login);
        expect(screen.getByText(/page to sign in or go to/)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Forgot password'})).toHaveAttribute('href', PublicRoutes.recoverPassword);
        expect(screen.getByText(/page to reset your password./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ExistentAccount email={'account@mail.com'} /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});