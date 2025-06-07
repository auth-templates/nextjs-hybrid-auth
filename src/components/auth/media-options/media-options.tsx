'use client';

import { Button } from '@mantine/core';
import styles from './media-options.module.css';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import classnames from 'classnames';

const MediaOptions = () => {
    return (
        <div className={styles.mediaOptions}>
            <div className={styles.line}></div>
            <div className={styles.mediaOption}>
                <Button 
                    component='a'
                    href="https://mantine.dev"
                    classNames={{
                        root: classnames(styles.buttonLink, styles.facebook),
                        inner: styles.buttonLinkInner,
                        label: styles.buttonLinkLabel
                    }}
                >
                    <FaFacebook size={28} className={styles.icon} data-testid="facebook-icon"/> 
                    <span>Login with Facebook</span>
                </Button>
            </div>
            <div className={styles.mediaOption}>
                <Button 
                    component='a'
                    href="https://mantine.dev"
                    classNames={{
                        root: classnames(styles.buttonLink, styles.google),
                        inner: styles.buttonLinkInner,
                        label: styles.buttonLinkLabel
                    }}
                >
                    <FcGoogle size={28} className={styles.icon} data-testid="google-icon"/> 
                    <span className={styles.googleLabel}>Login with Google</span>
                </Button>
            </div>
        </div>
    );
}

export default MediaOptions;