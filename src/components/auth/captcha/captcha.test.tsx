import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Captcha from './captcha';

const image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBg...";

describe('Captcha', () => {
    test('if all elements are present when there is an image', () => {
        render(<Captcha image={image} onRefresh={jest.fn()}/>)
        expect(screen.getByRole('img')).toBeInTheDocument();
        const capchaInput = screen.getByPlaceholderText('Enter captcha');
        expect(capchaInput).toBeInTheDocument();
        expect(capchaInput).toHaveAttribute('required');
        expect(screen.getByRole('button', {title: "Refresh"})).toBeInTheDocument();
        expect(screen.queryByTestId('small-lds-ring')).not.toBeInTheDocument();

    })

    test('if loader is present when there is no image', () => {
        render(<Captcha />);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByTestId('small-lds-ring')).toBeInTheDocument();
    })

    test('if onRefresh callback is called', () => {
        const mockOnRefresh = jest.fn();
        render(<Captcha image={image} onRefresh={mockOnRefresh} />);
        userEvent.click(screen.getByRole('button', {title: 'Refresh'}));
        expect(mockOnRefresh).toBeCalledTimes(1);
    })

    it('renders correctly', () => {
        const tree = renderer.create(<Captcha image={image} onRefresh={jest.fn()} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})