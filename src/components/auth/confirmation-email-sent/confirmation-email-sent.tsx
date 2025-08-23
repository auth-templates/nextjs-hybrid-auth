import classes from './confirmation-email-sent.module.css';

type ConfirmationEmailSentProps = {
	email: string;
};

export default function ConfirmationEmailSent({ email }: ConfirmationEmailSentProps) {
	return (
		<div className={classes.confirmationEmailSent}>
			A confirmation email has been sent to
			<div className={classes.email}> {email} </div>
			and it should arrive soon. Please check your inbox.
		</div>
	);
}
