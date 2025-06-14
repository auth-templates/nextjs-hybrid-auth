import classes from './reset-password-email-expired.module.css';
import { PublicRoutes } from '../../../routes';
import Link from 'next/link';

export default function ResetPasswordMailExpired() {
    return (
        <div className={classes.resetPasswordMailExpired}>
            Your reset password email has expired. Please go to
            <Link href={PublicRoutes.recoverPassword}> Forgot password </Link>
            page in order to send a new mail.
        </div>
    )
}