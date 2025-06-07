import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerifyAccountContainer from './verify-account';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = { token: '0000' };
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams:  () => mockedUsedNavigate,
}));

describe('VerifyAccountContainer', () => {
    beforeEach(() => {
        mockedUsedNavigate.token = "0000";
    })

    test('it should display account verified message if reset email request is succesful', async () => {
        render(        
            <MemoryRouter>
                <VerifyAccountContainer />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Your account has been verified successfully. Please go to/)).toBeInTheDocument();
        })
    });

    test('if account confirmation email expired component is displayed when "Confirmation token is not valid" message is received', async () => {
        mockedUsedNavigate.token = "1000";
        render(
            <MemoryRouter>
                <VerifyAccountContainer
                    status={{theme:'error', lines:['Confirmation token is not valid']}}
                />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText(/Your account confirmation email has expired. Please go to/)).toBeInTheDocument();
        });
    })

    it('should display the custom error message received from server', async () => {
        mockedUsedNavigate.token = "2000"
        render(        
            <MemoryRouter>
                <VerifyAccountContainer />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Custom message")).toBeInTheDocument();
        });
    })
})