import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TermsAndConditions from './terms-and-conditions';

describe('TermsAndConditions', () => {
    test('if all elements are present', () => {
        render(<TermsAndConditions />)
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('required');
        expect(screen.getByText(/I agree with the /)).toBeInTheDocument();
        const link = screen.getByRole('link', {name: "terms and conditions"});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/terms-and-conditions');
    }),

    it('renders correctly', () => {
        const tree = renderer.create(<TermsAndConditions />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})