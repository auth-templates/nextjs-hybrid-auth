import classes from './password-updated.module.css';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../../routes';

export default function PasswordUpdated() {
    return (
        <div className={classes.passwordUpdated}>
            Your password has been reset successfully. Please go to
            <Link to={PublicRoutes.login}> Sign in </Link>
            page to sign in.
        </div>
    )
}
