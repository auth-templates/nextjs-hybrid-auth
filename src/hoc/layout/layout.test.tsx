import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Layout from './layout';

describe('Layout', () => {
    it('contains title and logo', () => {
        render(
            <Layout title={"Title"}/>
        );

        expect(screen.getByRole("heading", "Title")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    })

    test('if children is rendered', () => {
        render(
            <Layout>
                <div data-testid="text">text</div>
            </Layout>
        );

        expect(screen.getByTestId("text")).toBeInTheDocument();
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Layout>
                <div data-testid="text">text</div>
            </Layout>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})