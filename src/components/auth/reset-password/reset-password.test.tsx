import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ResetPassword from './reset-password';

describe('ResetPassword', () => {
    test('if all elements are present', () => {
        render(<ResetPassword onReset={jest.fn()}/>);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter captcha")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Reset password" })).toBeInTheDocument();
    })

    test('if the right values are received by onReset callback', () => {
        const mockOnReset = jest.fn();
        render(
            <ResetPassword 
                onReset={mockOnReset} 
            />
        );

        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef8');
        userEvent.type(confirmPasswordInput, '@Abcdef8');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(resetButton);

        expect(mockOnReset).toBeCalledWith({ 
            password: "@Abcdef8",
            confirmPassword: "@Abcdef8",
            captcha: "w93bx",
        });
    })

    test('if message box is displayed when an error is received from the server', () => {
        render(
            <ResetPassword 
                onReset={jest.fn()} 
                status={{theme:'error', lines:['Failed to reset password. Please try again!']}}
            />
        );

        expect(screen.getByText(/Failed to reset password. Please try again!/)).toBeInTheDocument();
    })

    test('if password updated component is displayed when "Password updated" message is received', () => {
        render(
            <MemoryRouter>
                <ResetPassword 
                    onReset={jest.fn()} 
                    status={{theme:'info', lines:['Password updated']}}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your password has been reset successfully. Please go to/)).toBeInTheDocument();
    })

    test('if reset password email expired component is displayed when "Reset token is not valid message is received', () => {
        render(
            <MemoryRouter>
                <ResetPassword 
                    onReset={jest.fn()} 
                    status={{theme:'info', lines:['Reset token is not valid']}}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/Your reset password email has expired. Please go to/)).toBeInTheDocument();
    })

    test('if password inputs have theme danger and a message is displayed when a password is invalid', () => {
        render(
            <ResetPassword 
                onReset={jest.fn()}
            />
        );

        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef');
        userEvent.type(confirmPasswordInput, '@Abcdef');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(resetButton);

        expect(passwordInput).toHaveClass('danger');
        expect(confirmPasswordInput).toHaveClass('danger');
        expect(screen.getByText(/You password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol and one number./)).toBeInTheDocument();
    })

    test('if password inputs have theme danger and a message is displayed when passwords do no match', () => {
        render(
            <ResetPassword 
                onReset={jest.fn()}
            />
        );

        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const resetButton = screen.getByRole('button', { name: "Reset password" });
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(resetButton);

        expect(passwordInput).toHaveClass('danger');
        expect(confirmPasswordInput).toHaveClass('danger');
        expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
    })

    it('renders correctly', () => {
        const tree = renderer.create(<ResetPassword onReset={jest.fn()} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})