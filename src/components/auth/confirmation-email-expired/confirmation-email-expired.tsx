import classes from './confirmation-email-expired.module.css';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

export default function ConfirmationEmailExpired() {
    return (
        <div className={classes.confirmationEmailExpired}>
            Your account confirmation email has expired. Please go to
            <Link href={PublicRoutes.resendConfirmationEmail}> Resend confirmation email </Link>
            page in order to send a new mail.
        </div>
    )
}
