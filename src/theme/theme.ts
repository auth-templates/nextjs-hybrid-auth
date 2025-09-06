'use client';

import buttonClasses from './button.module.css';
import textInputClasses from './text-input.module.css';
import titleClasses from './title.module.css';
import passwordInputClasses from './password-input.module.css';
import { Button, MantineThemeOverride, PasswordInput, TextInput, Title } from '@mantine/core';
import { colors } from './colors';

export const theme: MantineThemeOverride = {
	// Semantic colors
	colors: colors,
	primaryColor: 'blue',

	// Border radius
	radius: {
		none: 'var(--border-radius-none)',
		sm: 'var(--border-radius-sm)',
		md: 'var(--border-radius-md)',
		lg: 'var(--border-radius-lg)',
		xl: 'var(--border-radius-xl)',
		'2xl': 'var(--border-radius-2xl)',
		full: 'var(--border-radius-full)',
	},

	// Spacing
	spacing: {
		0: 'var(--spacing-0)',
		xs: 'var(--spacing-xs)',
		sm: 'var(--spacing-sm)',
		md: 'var(--spacing-md)',
		lg: 'var(--spacing-lg)',
		xl: 'var(--spacing-xl)',
		'2xl': 'var(--spacing-2xl)',
		'3xl': 'var(--spacing-3xl)',
		'4xl': 'var(--spacing-4xl)',
	},

	// Breakpoints
	breakpoints: {
		xs: 'var(--breakpoints-xs)',
		sm: 'var(--breakpoints-sm)',
		md: 'var(--breakpoints-md)',
		lg: 'var(--breakpoints-lg)',
		xl: 'var(--breakpoints-xl)',
	},
	components: {
		Button: Button.extend({
			classNames: {
				root: buttonClasses.root,
			},
		}),
		TextInput: TextInput.extend({
			classNames: {
				root: textInputClasses.root,
				wrapper: textInputClasses.inputWrapper,
				input: textInputClasses.input,
				section: textInputClasses.section,
				label: textInputClasses.label,
				required: textInputClasses.required,
				description: textInputClasses.description,
				error: textInputClasses.error,
			},
		}),
		PasswordInput: PasswordInput.extend({
			classNames: {
				root: textInputClasses.root,
				wrapper: textInputClasses.inputWrapper,
				input: textInputClasses.input,
				section: textInputClasses.section,
				label: textInputClasses.label,
				required: textInputClasses.required,
				description: textInputClasses.description,
				error: textInputClasses.error,
			},
		}),
		Title: Title.extend({
			classNames: {
				root: titleClasses.titleRoot,
			},
		}),
	},
};
