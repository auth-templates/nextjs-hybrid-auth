import classes from './inexistent-account.module.css';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

type InexistentAccountProps = {
    email: string
}

export default function InexistentAccount({email}: InexistentAccountProps) {
    return (
        <div className={classes.inexistentAccount}>
            No account with the email <div className={classes.email}>{email}</div> has been found. Please go to 
            <Link 
                href={`${PublicRoutes.register}?email=${email}`}
                as={PublicRoutes.register} 
            > Sign Up </Link>
            page in order to create an account or try again with a different email.
        </div>
    )
}
