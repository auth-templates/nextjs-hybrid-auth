import { Checkbox, CheckboxProps, Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './terms-checkbox.module.css';

export default function TermsCheckbox(props: CheckboxProps) {
	const t = useTranslations('forms.terms');

	return (
		<Checkbox
			classNames={{
				root: styles.checkboxRoot,
				label: styles.labelText,
				input: styles.checkboxFocusWithinInput,
			}}
			label={
				<Text size="sm" className={styles.labelText}>
					{t.rich('agreement', {
						termsLink: (chunks) => (
							<Link href="/terms" passHref>
								{chunks}
							</Link>
						),
					})}
				</Text>
			}
			{...props}
		/>
	);
}
