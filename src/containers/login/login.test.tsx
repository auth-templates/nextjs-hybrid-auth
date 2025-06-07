import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import LoginContainer from './login';
import { PrivateRoutes } from '../../routes';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('LoginContainer', () => {
    test('it should navigate to dashboard view if login request is succesful', async () => {
        render(        
            <MemoryRouter>
                <LoginContainer />
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "pass@mail.com");
        const password = screen.getByLabelText('Password');
        userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        userEvent.click(loginButton);
        await waitFor(() => {
            expect(mockedUsedNavigate).toBeCalledTimes(1);
            expect(mockedUsedNavigate).toBeCalledWith(PrivateRoutes.dashboard);
        })
    });

    test('it should display an error message when csrf token is a not valid', async () => {
        render(        
            <MemoryRouter>
                <LoginContainer />
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "badcsrftoken@mail.com");
        const password = screen.getByLabelText('Password');
        userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        userEvent.click(loginButton);

        expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
    });

    test('it should display an error message when there is a network failure', async () => {
        render(        
            <MemoryRouter>
                <LoginContainer />
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "networkfail@mail.com");
        const password = screen.getByLabelText('Password');
        userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        userEvent.click(loginButton);

        expect(await screen.findByText('Login failed! Un unexpected error occured.')).toBeInTheDocument();
    });

    test('it should display an error message when email is invalid', async () => {
        render(        
            <MemoryRouter>
                <LoginContainer />
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "invalidaccount@mail.com");
        const password = screen.getByLabelText('Password');
        userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        userEvent.click(loginButton);

        expect(await screen.findByText(/No account with the email/)).toBeInTheDocument();
    });

    test('it should display an error message when password is invalid', async () => {
        render(        
            <MemoryRouter>
                <LoginContainer />
            </MemoryRouter>
        );
        const email = screen.getByLabelText('Email');
        userEvent.type(email, "invalidpassword@mail.com");
        const password = screen.getByLabelText('Password');
        userEvent.type(password, "password");
        const loginButton = screen.getByRole('button', { name: 'Login'});
        userEvent.click(loginButton);

        expect(await screen.findByText(/Password is invalid/)).toBeInTheDocument();
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter> 
                <LoginContainer />
            </MemoryRouter> 
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})