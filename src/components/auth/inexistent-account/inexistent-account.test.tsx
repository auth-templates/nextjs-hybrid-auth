import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import InexistentAccount from './inexistent-account';
import {PublicRoutes} from '../../../routes';

describe("InexistentAccount", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <InexistentAccount email={'account@mail.com'} />
            </MemoryRouter>
        );

        expect(screen.getByText(/No account with the email/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/has been found. Please go to/)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Sign Up'})).toHaveAttribute('href', PublicRoutes.register)
        expect(screen.getByText(/page in order to create an account./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <InexistentAccount email={'account@mail.com'} /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});