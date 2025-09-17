import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		css: true,
		testTransformMode: {
			web: ['.js', '.ts', '.jsx', '.tsx'],
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			reportsDirectory: './coverage',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/**/*.test.{ts,tsx}',
				'src/**/*.spec.{ts,tsx}',
				'src/**/index.tsx',
				'src/mocks/**',
				'src/test-utils/**',
				'src/tokens/**',
				'src/assets/**',
				'src/messages/**',
				'src/routes.ts',
				'src/config.ts',
				'src/instrumentation.ts',
				'src/middleware.ts',
				'src/types/**',
				'src/app/**',
				'src/api/generated/**',
			],
		},
		reporters: ['default', 'html'],
		outputFile: {
			html: './coverage/reports/index.html',
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
