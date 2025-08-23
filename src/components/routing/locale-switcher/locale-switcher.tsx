import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-select';
import { ComboboxItem } from '@mantine/core';
import locales from './locales.json';

export default function LocaleSwitcher() {
	const locale = useLocale();

	const options: ComboboxItem[] = routing.locales.map(
		(value) =>
			({
				value: value,
				label: locales.find((x) => x.value === value)?.label,
			}) as ComboboxItem
	);

	return <LocaleSwitcherSelect data={options} defaultValue={locale} />;
}
