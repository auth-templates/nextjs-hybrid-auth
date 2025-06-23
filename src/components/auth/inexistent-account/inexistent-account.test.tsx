import { render, screen } from '@/test-utils';
import InexistentAccount from './inexistent-account';
import {PublicRoutes} from '../../../routes';

describe("InexistentAccount", () => {
    it('should contain all elements', async () => {
        render(
            <InexistentAccount email={'account@mail.com'} />
        );

        expect(screen.getByText(/No account with the email/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/has been found. Please go to/)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Sign Up'})).toHaveAttribute('href', PublicRoutes.register)
        expect(screen.getByText(/page in order to create an account./)).toBeInTheDocument();
    });
});