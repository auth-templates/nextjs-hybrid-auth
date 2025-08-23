import classes from './reset-password-email-sent.module.css';

type ResetPasswordEmailSentProps = {
	email: string;
};

export default function ResetPasswordEmailSent({ email }: ResetPasswordEmailSentProps) {
	return (
		<div className={classes.resetPasswordEmailSent}>
			An email with reset password intructions has been sent to
			<div className={classes.email}>{email}</div>
			and it should arrive soon. Please check your inbox.
		</div>
	);
}
