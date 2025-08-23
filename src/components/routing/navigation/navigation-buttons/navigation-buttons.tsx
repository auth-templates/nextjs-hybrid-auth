'use client';

import classes from './navigation-buttons.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { Button } from '@mantine/core';

export const NavigationButtons = () => {
	const t = useTranslations('navigation');
	const pathname = usePathname();
	const isLogin = pathname.match('/login');
	const session: any = undefined;

	return (
		<div className={classes.root}>
			{session && session.user ? (
				<>
					<div className={classes.user}>
						<BiSolidUserRectangle className={classes.userIcon} />
						<p className={classes.username}>{session.user.name}</p>
					</div>
					<Button onClick={() => {}} className={classes.logoutButton} variant="filled">
						{t('logout')}
					</Button>
				</>
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
