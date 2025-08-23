'use client';

import { Button } from '@mantine/core';
import styles from './media-options.module.css';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import classnames from 'classnames';
import { useTranslations } from 'next-intl';

const MediaOptions = ({ isLogin }: { isLogin?: boolean }) => {
	const t = useTranslations('forms.social-auth');

	return (
		<div className={styles.mediaOptions}>
			<div className={styles.line}></div>
			<div className={styles.mediaOption}>
				<Button
					component="a"
					href="https://mantine.dev"
					classNames={{
						root: classnames(styles.buttonLink, styles.github),
						inner: styles.buttonLinkInner,
						label: styles.buttonLinkLabel,
					}}
				>
					<FaGithub size={28} className={styles.icon} data-testid="github-icon" />
					<span>{isLogin ? t('login-with-github') : t('signup-with-github')}</span>
				</Button>
			</div>
			<div className={styles.mediaOption}>
				<Button
					component="a"
					href="https://mantine.dev"
					classNames={{
						root: classnames(styles.buttonLink, styles.google),
						inner: styles.buttonLinkInner,
						label: styles.buttonLinkLabel,
					}}
				>
					<FcGoogle size={28} className={styles.icon} data-testid="google-icon" />
					<span className={styles.googleLabel}>
						{isLogin ? t('login-with-google') : t('signup-with-google')}
					</span>
				</Button>
			</div>
		</div>
	);
};

export default MediaOptions;
