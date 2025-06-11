'use client'

import React from "react";
import styles from './auth-actions.module.css';
import { BiSolidUserRectangle   } from "react-icons/bi";
import { Button } from "@mantine/core";

const AuthActions = () => {
    const session: any = undefined;
    return (
            <div className={styles.authActions}>
                {
                    (session && session?.user) ? (
                        <>
                            <div className={ styles.user } >
                                <BiSolidUserRectangle className={styles.userIcon} />
                                <p className={styles.username}>{session.user.name}</p>
                            </div>
                            <Button onClick={() => {}} className={styles.button} variant="filled">
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => {}} className={styles.button} variant="filled">
                            Sign In
                        </Button>
                    )
                }
            </div>
      );
};

export default AuthActions;