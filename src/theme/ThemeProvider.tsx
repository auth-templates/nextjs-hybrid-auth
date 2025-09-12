'use client';

import React, { useEffect } from 'react';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import { useLocalStorage, useColorScheme } from '@mantine/hooks';
import { theme as mantineTheme } from './theme';
import toggleStyles from './theme-toggle.module.css';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const system = useColorScheme();
	const [mode, setMode] = useLocalStorage<'light' | 'dark' | 'auto'>({
		key: 'color-mode',
		defaultValue: 'auto',
	});

	const effectiveScheme: 'light' | 'dark' = mode === 'auto' ? (system ?? 'light') : mode;

	useEffect(() => {
		const link = document.getElementById('theme-colors') as HTMLLinkElement | null;
		if (link) {
			link.href = effectiveScheme === 'dark' ? '/tokens/colors-dark.css' : '/tokens/colors-light.css';
		}
		document.documentElement.setAttribute('data-mantine-color-scheme', effectiveScheme);
	}, [effectiveScheme]);

	return (
		<>
			<ColorSchemeScript defaultColorScheme={effectiveScheme} />
			<MantineProvider theme={mantineTheme} defaultColorScheme={effectiveScheme}>
				{children}
			</MantineProvider>
		</>
	);
}

export function ThemeModeToggle() {
	const system = useColorScheme();
	const [mode, setMode] = useLocalStorage<'light' | 'dark' | 'auto'>({ key: 'color-mode', defaultValue: 'auto' });

	const next = () => {
		if (mode === 'auto') setMode('light');
		else if (mode === 'light') setMode('dark');
		else setMode('auto');
	};

	const label = mode === 'auto' ? `Auto (${system ?? 'light'})` : mode;
	const icon = mode === 'auto' ? '🌓' : mode === 'light' ? '☀️' : '🌙';

	return (
		<button className={toggleStyles.button} onClick={next} aria-label="Toggle color mode" title={`Mode: ${label}`}>
			<span className={toggleStyles.icon} aria-hidden>
				{icon}
			</span>
			<span className={toggleStyles.label}>{label}</span>
		</button>
	);
}
