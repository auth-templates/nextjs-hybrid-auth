import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import MessageBox from './message-box';

describe('MessageBox', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<MessageBox />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})