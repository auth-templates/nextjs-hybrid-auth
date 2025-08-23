'use client';

import buttonClasses from './button.module.css';
import textInputClasses from './text-input.module.css';
import titleClasses from './title.module.css';
import passwordInputClasses from './password-input.module.css';
import { Button, MantineThemeOverride, PasswordInput, TextInput, Title } from '@mantine/core';

export const theme: MantineThemeOverride = {
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
