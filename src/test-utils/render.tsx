import React from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import messages from '@/messages/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';
import { theme } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import { vi } from 'vitest';

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
	options?: { pickedMessages?: string[]; router?: any }
): ReturnType<typeof testingLibraryRender> {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	// Create a mock router that can be controlled in tests
	const router = options?.router || {
		...mockRouter,
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	};

	// Use full messages by default, or pick specific ones if provided
	const messagesToUse = options?.pickedMessages ? pick(messages, options.pickedMessages) : messages;

	return testingLibraryRender(<>{ui}</>, {
		wrapper: ({ children }: { children: React.ReactNode }) => (
			<AppRouterContext.Provider value={router}>
				<QueryClientProvider client={queryClient}>
					<NextIntlClientProvider locale="en" messages={messagesToUse}>
						<MantineProvider theme={theme} env="test">
							{children}
						</MantineProvider>
					</NextIntlClientProvider>
				</QueryClientProvider>
			</AppRouterContext.Provider>
		),
	});
}
