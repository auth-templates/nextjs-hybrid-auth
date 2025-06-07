import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import Checkbox from './checkbox';

describe('Checkbox', () => {
    test('if all elements are present', () => {
        render(<Checkbox />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox-cover')).toBeInTheDocument();
    }),

    test('if it is not checked by default', () => {
        render(<Checkbox />);
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    }),

    test('if it changes state properly', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        const checkboxCover = screen.getByTestId('checkbox-cover');
        expect(checkbox).not.toBeChecked();
        userEvent.click(checkboxCover);
        expect(checkbox).toBeChecked();
        userEvent.click(checkboxCover);
        expect(checkbox).not.toBeChecked();
    }),

    it('renders correctly', () => {
        const tree = renderer.create(<Checkbox />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})