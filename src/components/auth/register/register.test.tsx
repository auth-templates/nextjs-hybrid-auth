import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Register from './register';

describe('Register', () => {
    test('if all elements are present', () => {
        render(<Register onRegister={jest.fn()}/>);
        expect(screen.getByLabelText('First name (optional)')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter captcha")).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Register" })).toBeInTheDocument();
    })

    test('if the right values are received by onRegister callback', () => {
        const mockOnRegister = jest.fn();
        render(
            <Register 
                onRegister={mockOnRegister} 
            />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'networkfail@mail.com')
        userEvent.type(passwordInput, '@Abcdef8');
        userEvent.type(confirmPasswordInput, '@Abcdef8');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        expect(mockOnRegister).toBeCalledWith({ 
            firstname: "", 
            lastname: "",
            company: "",
            email: "networkfail@mail.com", 
            password: "@Abcdef8",
            confirmPassword: "@Abcdef8",
            captcha: "w93bx",
            toc: true 
        });
    })

    test('if message box is displayed when an error is received from the server', () => {
        render(
            <Register 
                onRegister={jest.fn()} 
                status={{theme:'error', lines:['Registration failed! Please try again.']}}
            />
        );

        expect(screen.getByText(/Registration failed! Please try again./)).toBeInTheDocument();
    })

    test('if password inputs have theme danger and a message is displayed when a password is invalid', () => {
        render(
            <Register 
                onRegister={jest.fn()}
            />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'account@mail.com')
        userEvent.type(passwordInput, '@Abcdef');
        userEvent.type(confirmPasswordInput, '@Abcdef');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        expect(passwordInput).toHaveClass('danger');
        expect(confirmPasswordInput).toHaveClass('danger');
        expect(screen.getByText(/You password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol and one number./)).toBeInTheDocument();
    })

    test('if password inputs have theme danger and a message is displayed when passwords do no match', () => {
        render(
            <Register 
                onRegister={jest.fn()}
            />
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password'); 
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        const capchaInput = screen.getByPlaceholderText("Enter captcha");
        const checkbox = screen.getByRole('checkbox');
        const registerButton = screen.getByRole('button', { name: "Register" });
        userEvent.type(emailInput, 'account@mail.com')
        userEvent.type(passwordInput, '@Abcdef9');
        userEvent.type(confirmPasswordInput, '@Abcdef');
        userEvent.type(capchaInput, 'w93bx');
        userEvent.click(checkbox);
        userEvent.click(registerButton);

        expect(passwordInput).toHaveClass('danger');
        expect(confirmPasswordInput).toHaveClass('danger');
        expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
    })

    it('renders correctly', () => {
        const tree = renderer.create(<Register onRegister={jest.fn()} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})