'use client';

import classes from './navigation-buttons.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAuthSessionQueryKey, getAuthSessionOptions } from '@/api/generated/@tanstack/react-query.gen';
import AccountDropdown from '../account-dropdown';

export const NavigationButtons = () => {
	const t = useTranslations('navigation');
	const pathname = usePathname();
	const isLogin = pathname.match('/login');
	const isPublicPage = pathname === '/' || isLogin;

	// Only get user session data if we're not on a public page
	const { data: sessionData, isLoading } = useQuery({
		...getAuthSessionOptions(),
		queryKey: getAuthSessionQueryKey(),
		enabled: !isPublicPage, // Only run query on private pages
		retry: false, // Don't retry on error to avoid loops
	});

	const user = sessionData?.user;

	return (
		<div className={classes.root}>
			{!isPublicPage && user ? (
				<AccountDropdown />
			) : isLogin ? (
				<Link className={classes.homeButton} href={'/'}>
					{t('home')}
				</Link>
			) : (
				<Link className={classes.loginButton} href="/login">
					{t('login')}
				</Link>
			)}
		</div>
	);
};
