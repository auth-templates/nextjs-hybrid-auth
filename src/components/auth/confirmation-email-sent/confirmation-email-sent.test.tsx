import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConfirmationEmailSent from './confirmation-email-sent';

describe("ConfirmationEmailSent", () => {
    it('should contain all elements', async () => {
        render(
            <MemoryRouter>
                <ConfirmationEmailSent email={'account@mail.com'} />
            </MemoryRouter>
        );

        expect(screen.getByText(/A confirmation email has been sent to/)).toBeInTheDocument(); 
        expect(screen.getByText(/account@mail.com/)).toBeInTheDocument();
        expect(screen.getByText(/and it should arrive soon. Please check your inbox./)).toBeInTheDocument();
    });

    it("renders correctly", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ConfirmationEmailSent email={'account@mail.com'} /> 
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});