import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPasswordContainer from './reset-password';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = {token: '0000'};
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams:  () => mockedUsedNavigate,
}));

describe('ResetPasswordContainer', () => {
    beforeEach(() => {
        mockedUsedNavigate.token = "0000";
    })

    test('it should display password updated component if reset email request is succesful', async () => {
        render(        
            <MemoryRouter>
                <ResetPasswordContainer />
            </MemoryRouter>
        );
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef8');
        userEvent.type(confirmPasswordInput, '@Abcdef8');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(resetButton);

        await waitFor(() => {
            expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument();
        })
    });

    test('it should display rest password email expired component if error "Reset token is not valid" is received from server', async () => {
        mockedUsedNavigate.token = "1000";
        render(        
            <MemoryRouter>
                <ResetPasswordContainer />
            </MemoryRouter>
        );
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef8');
        userEvent.type(confirmPasswordInput, '@Abcdef8');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(resetButton);

        await waitFor(() => {
            expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument();
        })
    });

    it('should display the custom error message received from server', async () => {
        render(        
            <MemoryRouter>
                <ResetPasswordContainer />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef8');
        userEvent.type(confirmPasswordInput, '@Abcdef8');
        userEvent.type(capchaInput, 'wrong-captcha');
        userEvent.click(resetButton);

        await waitFor(() => {
            expect(screen.getByText("Wrong captcha")).toBeInTheDocument();
        })
    })
})