import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SmallLoader from './small-loader';

describe('SmallLoader', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<SmallLoader />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});