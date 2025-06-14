import classes from './password-updated.module.css';
import { PublicRoutes } from '../../../routes';
import Link from 'next/link';

export default function PasswordUpdated() {
    return (
        <div className={classes.passwordUpdated}>
            Your password has been reset successfully. Please go to
            <Link href={PublicRoutes.login}> Sign in </Link>
            page to sign in.
        </div>
    )
}
