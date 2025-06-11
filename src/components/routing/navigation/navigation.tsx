import React from 'react';
import classes from './navigation.module.css';
import { GiDandelionFlower } from "react-icons/gi";
import AuthActions from '../auth-actions/auth-actions';
import classnames from "classnames";
import NavigationLink from '../NavigationLink';
import LocaleSwitcher from '../LocaleSwitcher';
import {useTranslations} from 'next-intl';

export default function Navigation({ className }: { className?: string }) {
  const t = useTranslations('Navigation');

  return (
    <div className={classnames(classes.navbar, className)}>
        <div className={ classes.appInfo }>
            <GiDandelionFlower className={classes.logo} />
            <div className={ classes.appName }> Company Logo </div>
        </div>
        <div className={ classes.user }>
            <LocaleSwitcher />
            {/* <AuthActions /> */}
        </div>
    </div>
    // <div className={classes.}>
    //   <nav className="container flex justify-between p-2 text-white">
    //     <div>
    //       <NavigationLink href="/">{t('home')}</NavigationLink>
    //       <NavigationLink href="/pathnames">{t('pathnames')}</NavigationLink>
    //     </div>

    //   </nav>
    // </div>
  );
}