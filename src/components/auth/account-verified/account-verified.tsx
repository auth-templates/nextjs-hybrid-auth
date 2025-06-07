import classes from './account-verified.module.css';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

export default function AccountVerified() {
    return (
        <div className={classes.accountVerified}>
            Your account has been verified successfully. Please go to
            <Link href={PublicRoutes.login}> Sign in </Link> 
            page to sign in.
        </div>
    )
}