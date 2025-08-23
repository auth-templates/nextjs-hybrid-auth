import classes from './account-not-active.module.css';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

type AccountNotActiveProps = {
	email: string;
};

export default function AccountNotActive({ email }: AccountNotActiveProps) {
	return (
		<div className={classes.accountNotActive}>
			An account with the email <div className={classes.email}>{email}</div> exists, but it is not active. Check
			your inbox for the confirmation email or please go to
			<Link
				href={`${PublicRoutes.requestConfirmationEmail}?email=${email}`}
				as={PublicRoutes.requestConfirmationEmail}
			>
				Resend confirmation email
			</Link>
			page in order to send a new confirmation email.
		</div>
	);
}
