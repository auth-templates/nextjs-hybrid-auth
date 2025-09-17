import { render, screen } from '@/test-utils';
import MediaOptions from './media-options';
import { MantineProvider } from '@mantine/core';

describe('MediaOptions', () => {
	it('should contain all elements', () => {
		render(
			<MantineProvider>
				<MediaOptions />
			</MantineProvider>
		);

		// The component should render without crashing
		expect(screen.getByRole('link', { name: 'Sign up with GitHub' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Sign up with Google' })).toBeInTheDocument();
	});
});
