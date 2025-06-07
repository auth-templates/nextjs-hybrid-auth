import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PasswordUpdated from './password-updated';
import { PublicRoutes } from '../../routes';

describe("PasswordUpdated", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <PasswordUpdated />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument(); 
        expect(screen.getByRole('link', {name: 'Sign in'})).toHaveAttribute('href', PublicRoutes.login);
        expect(screen.getByText(/page to sign./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <PasswordUpdated /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});