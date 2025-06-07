import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AccountVerified from './account-verified';
import { PublicRoutes } from '../../routes';

describe("AccountVerified", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <AccountVerified />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your account has been verified successfully. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', PublicRoutes.login);
        expect(screen.getByText(/page to sign in./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <AccountVerified/> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});