'use client';

import classes from './navigation-link.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import classNames from 'classnames';

export default function NavigationLink({ href, className, ...rest }: ComponentProps<typeof Link>) {
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
	const isActive = pathname === href;

	return (
		<Link
			aria-current={isActive ? 'page' : undefined}
			className={classNames(classes.root, className)}
			href={href}
			{...rest}
		/>
	);
}
