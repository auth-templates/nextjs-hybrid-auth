import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Details from './details';

describe('Details', () => {
    
    test('if all elements are present', () => {
        render(<Details />);
        expect(screen.getByLabelText('First name (optional)')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name (optional)')).toBeInTheDocument();
        expect(screen.getByLabelText('Company (optional)')).toBeInTheDocument();
    })

    it('renders correctly', () => {
        const tree = renderer.create(<Details />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})