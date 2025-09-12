'use client';

import buttonStyles from './button.module.css';
import textInputStyles from './text-input.module.css';
import titleStyles from './title.module.css';
import passwordInputStyles from './password-input.module.css';
import {
	Alert,
	Badge,
	Card,
	Checkbox,
	Divider,
	MantineThemeOverride,
	Modal,
	PasswordInput,
	Radio,
	Select,
	Switch,
	TextInput,
	Title,
	Tooltip,
	Button,
} from '@mantine/core';
import alertStyles from './alert.module.css';
import badgeStyles from './badge.module.css';
import cardStyles from './card.module.css';
import modalStyles from './modal.module.css';
import tooltipStyles from './tooltip.module.css';
import dividerStyles from './divider.module.css';
import checkboxStyles from './checkbox.module.css';
import radioStyles from './radio.module.css';
import switchStyles from './switch.module.css';
import selectStyles from './select.module.css';
import { colors } from './colors';

export const theme: MantineThemeOverride = {
	// Semantic colors
	colors: colors,
	primaryColor: 'blue',

	// Border radius
	radius: {
		none: 'var(--border-radius-none)',
		xs: 'var(--border-radius-xs)',
		sm: 'var(--border-radius-sm)',
		md: 'var(--border-radius-md)',
		lg: 'var(--border-radius-lg)',
		xl: 'var(--border-radius-xl)',
		'2xl': 'var(--border-radius-2xl)',
		'3xl': 'var(--border-radius-3xl)',
		full: 'var(--border-radius-full)',
	},

	// Spacing
	spacing: {
		0: 'var(--spacing-0)',
		xxs: 'var(--spacing-xxs)',
		xs: 'var(--spacing-xs)',
		sm: 'var(--spacing-sm)',
		md: 'var(--spacing-md)',
		lg: 'var(--spacing-lg)',
		xl: 'var(--spacing-xl)',
		'2xl': 'var(--spacing-2xl)',
		'3xl': 'var(--spacing-3xl)',
		'4xl': 'var(--spacing-4xl)',
		'5xl': 'var(--spacing-5xl)',
		'6xl': 'var(--spacing-6xl)',
		'7xl': 'var(--spacing-7xl)',
	},

	// Breakpoints
	breakpoints: {
		xs: 'var(--breakpoints-xs)',
		sm: 'var(--breakpoints-sm)',
		md: 'var(--breakpoints-md)',
		lg: 'var(--breakpoints-lg)',
		xl: 'var(--breakpoints-xl)',
		'2xl': 'var(--breakpoints-2xl)',
	},
	components: {
		Button: Button.extend({
			classNames: {
				root: buttonStyles.root,
			},
		}),
		Alert: Alert.extend({
			classNames: {
				root: alertStyles.root,
				title: alertStyles.title,
				message: alertStyles.message,
				icon: alertStyles.icon,
			},
		}),
		Badge: Badge.extend({
			classNames: {
				root: badgeStyles.root,
			},
		}),
		Card: Card.extend({
			classNames: {
				root: cardStyles.root,
			},
		}),
		Modal: Modal.extend({
			classNames: {
				root: modalStyles.root,
				overlay: modalStyles.overlay,
			},
		}),
		Tooltip: Tooltip.extend({
			classNames: {
				tooltip: tooltipStyles.tooltip,
				arrow: tooltipStyles.arrow,
			},
		}),
		Divider: Divider.extend({
			classNames: {
				root: dividerStyles.root,
			},
		}),
		Checkbox: Checkbox.extend({
			classNames: {
				root: checkboxStyles.root,
				input: checkboxStyles.input,
				label: checkboxStyles.label,
			},
		}),
		Radio: Radio.extend({
			classNames: {
				root: radioStyles.root,
				radio: radioStyles.radio,
				label: radioStyles.label,
			},
		}),
		Switch: Switch.extend({
			classNames: {
				root: switchStyles.root,
				track: switchStyles.track,
				thumb: switchStyles.thumb,
				input: switchStyles.input,
			},
		}),
		Select: Select.extend({
			classNames: {
				root: selectStyles.root,
				input: selectStyles.input,
				dropdown: selectStyles.dropdown,
				option: selectStyles.item,
			},
		}),
		TextInput: TextInput.extend({
			classNames: {
				root: textInputStyles.root,
				wrapper: textInputStyles.inputWrapper,
				input: textInputStyles.input,
				section: textInputStyles.section,
				label: textInputStyles.label,
				required: textInputStyles.required,
				description: textInputStyles.description,
				error: textInputStyles.error,
			},
		}),
		PasswordInput: PasswordInput.extend({
			classNames: {
				root: passwordInputStyles.root,
				wrapper: passwordInputStyles.inputWrapper,
				input: passwordInputStyles.input,
				section: passwordInputStyles.section,
				label: passwordInputStyles.label,
				required: passwordInputStyles.required,
				description: passwordInputStyles.description,
				error: passwordInputStyles.error,
				innerInput: passwordInputStyles.innerInput,
			},
		}),
		Title: Title.extend({
			classNames: {
				root: titleStyles.titleRoot,
			},
		}),
	},
};
