import { render, screen } from '@testing-library/react';
import MediaOptions from './media-options';
import { MantineProvider } from '@mantine/core';

describe("MediaOptions", () => {
    it('should contain all elements', () => {
        render(
            <MantineProvider>
                <MediaOptions />
            </MantineProvider>
        );

        const facebookLink = screen.getByRole('link', {name: /Login with Facebook/});
        expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
        expect(facebookLink).toBeInTheDocument();
        expect(facebookLink).toHaveAttribute('href', 'https://mantine.dev');
        const googleLink = screen.getByRole('link', {name: /Login with Google/});
        expect(googleLink).toBeInTheDocument();
        expect(googleLink).toHaveAttribute('href', 'https://mantine.dev');
        expect(screen.getByTestId("google-icon")).toBeInTheDocument();
    })
});