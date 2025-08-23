import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import messages from '@/messages/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';
import { theme } from '@/theme';

/**
 * Renders a React component with necessary providers for testing purposes.
 *
 * This function wraps the given UI with:
 * - `NextIntlClientProvider` to provide internationalization support,
 * - `MantineProvider` for styling and theme context,
 * and passes it to `testingLibraryRender` from React Testing Library.
 *
 * @param {React.ReactNode} ui - The React UI component to render.
 * @param {Object} [options] - Optional configuration for rendering.
 * @param {string[]} [options.pickedMessages] - An array of message keys to include in the i18n provider.
 *
 * @returns {ReturnType<typeof testingLibraryRender>} The result of the render, including utility functions from RTL.
 */
export function render(
	ui: React.ReactNode,
	options?: { pickedMessages: string[] }
): ReturnType<typeof testingLibraryRender> {
	return testingLibraryRender(<>{ui}</>, {
		wrapper: ({ children }: { children: React.ReactNode }) => (
			<NextIntlClientProvider locale="en" messages={pick(messages, options?.pickedMessages ?? [])}>
				<MantineProvider theme={theme} env="test">
					{children}
				</MantineProvider>
			</NextIntlClientProvider>
		),
	});
}
