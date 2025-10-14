import React from 'react';
import classes from './navigation.module.css';
import { GiDandelionFlower } from 'react-icons/gi';
import classnames from 'classnames';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import { NavigationButtons } from './navigation-buttons/navigation-buttons';

export default function Navigation({ className }: { className?: string }) {
	return (
		<div className={classnames(classes.navbar, className)}>
			<div className={classes.appInfo}>
				<GiDandelionFlower className={classes.logo} />
				<div className={classes.appName}> Company Logo </div>
			</div>
			<div className={classes.user}>
				<LocaleSwitcher />
				<NavigationButtons />
			</div>
		</div>
	);
}
