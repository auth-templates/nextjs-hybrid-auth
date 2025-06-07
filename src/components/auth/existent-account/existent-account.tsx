import classes from './existent-account.module.css';
import Link from 'next/link';
import { PublicRoutes } from '@/routes';

type ExistentAccountProps = {
    email: string
}

export default function ExistentAccount({email}: ExistentAccountProps) {
    return (
        <div className={classes.existentAccount}>
            An account with the email <div className={classes.email}>{email}</div> already exists. Please go to 
            <Link href={`${PublicRoutes.login}?email=${email}`} as={PublicRoutes.login}> Sign in </Link>
            page to sign in or go to 
            <Link href={`${PublicRoutes.recoverPassword}?email=${email}`} as={PublicRoutes.recoverPassword}> Forgot password </Link> 
            page to reset your password.
        </div>
    )
}