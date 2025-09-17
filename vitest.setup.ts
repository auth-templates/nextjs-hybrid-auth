// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import './src/mocks/next-router-utils/next-router-utils';

import { server } from './src/mocks/node';

// Enable API mocking before all the tests.
beforeAll(() => {
	server.listen({ onUnhandledRequest: 'warn' });
});

// Reset the request handlers between each test.
// This way the handlers we add on a per-test basis
// do not leak to other, irrelevant tests.
afterEach(() => {
	server.resetHandlers();
});

// Finally, disable API mocking after the tests are done.
afterAll(() => {
	server.close();
});

// Mock matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // Deprecated
		removeListener: vi.fn(), // Deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
	writable: true,
	value: vi.fn(),
});

// Mock fetch if needed
global.fetch = vi.fn();

// Mock Next.js app router
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	})),
	useParams: vi.fn(() => ({ token: 'test-token' })),
	useSearchParams: vi.fn(() => new URLSearchParams()),
	usePathname: vi.fn(() => '/test'),
}));

// Mock Next.js i18n navigation
vi.mock('@/i18n/navigation', () => ({
	useRouter: vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	})),
	useParams: vi.fn(() => ({ token: 'test-token' })),
	useSearchParams: vi.fn(() => new URLSearchParams()),
	usePathname: vi.fn(() => '/test'),
}));
