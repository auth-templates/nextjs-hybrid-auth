import classes from './reset-password-email-expired.module.css';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../../routes';

export default function ResetPasswordMailExpired() {
    return (
        <div className={classes.resetPasswordMailExpired}>
            Your reset password email has expired. Please go to
            <Link to={PublicRoutes.recoverPassword}> Forgot password </Link>
            page in order to send a new mail.
        </div>
    )
}