import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Credentials from './credentials';

describe('Credentials', () => {
    test('if all elements are present', () => {
        render(<Credentials />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    })

    test('if all elements have the right settings', () => {
        render(<Credentials/>);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toHaveAttribute('required');
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toHaveAttribute('required');
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        expect(confirmPasswordInput).toHaveAttribute('required');
    })

    test('if email input has theme "danger" when invalidEmail prop is true', () => {
        render(<Credentials invalidEmail={true} />);
        expect(screen.getByLabelText('Email')).toHaveClass('danger');
    })

    test('if password inputs have theme "danger" when invalidPassword prop is true', async () => {
        render(<Credentials invalidPassword={true} />);
        expect(screen.getByLabelText('Password')).toHaveClass('danger');
        expect(screen.getByLabelText('Confirm password')).toHaveClass('danger');
    })

    test('if theme changes to "normal" for all inputs when theme is "danger" and email get\'s the focus', async () => {
        render(<Credentials invalidPassword={true} invalidEmail={true} />);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toHaveClass('danger');
        const passwordInput = screen.getByLabelText('Password'); 
        expect(passwordInput).toHaveClass('danger');
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        expect(confirmPasswordInput).toHaveClass('danger');

        userEvent.click(emailInput);

        expect(emailInput).toHaveClass('normal');
        expect(passwordInput).toHaveClass('normal');
        expect(confirmPasswordInput).toHaveClass('normal');
    })

    test('if theme changes to "normal" for all inputs when theme is "danger" and password input get\'s the focus', async () => {
        render(<Credentials invalidPassword={true} invalidEmail={true}/>);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toHaveClass('danger');
        const passwordInput = screen.getByLabelText('Password'); 
        expect(passwordInput).toHaveClass('danger');
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        expect(confirmPasswordInput).toHaveClass('danger');

        userEvent.click(passwordInput);

        expect(emailInput).toHaveClass('normal');
        expect(passwordInput).toHaveClass('normal');
        expect(confirmPasswordInput).toHaveClass('normal');
    })

    test('if theme changes to "normal" for all inputs when theme is "danger" and confirm password input get\'s the focus', async () => {
        render(<Credentials invalidPassword={true} invalidEmail={true}/>);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toHaveClass('danger');
        const passwordInput = screen.getByLabelText('Password'); 
        expect(passwordInput).toHaveClass('danger');
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        expect(confirmPasswordInput).toHaveClass('danger');

        userEvent.click(confirmPasswordInput);

        expect(emailInput).toHaveClass('normal');
        expect(passwordInput).toHaveClass('normal');
        expect(confirmPasswordInput).toHaveClass('normal');
    })

    it('renders correctly', () => {
        const tree = renderer.create(<Credentials />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
