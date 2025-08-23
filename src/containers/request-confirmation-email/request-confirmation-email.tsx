'use client';

import { RequestConfirmationEmailForm } from '../../components/auth/request-confirmation-email-form';
import ConfirmationEmailSent from '@/components/auth/confirmation-email-sent';
import { useMutation } from '@tanstack/react-query';
import { getCsrfToken } from '@/api/generated';
import { postAuthResendActivationEmailMutation } from '@/api/generated/@tanstack/react-query.gen';

export default function ResendConfirmationEmailContainer() {
	const { data, error, mutate, status, isPending } = useMutation({
		...postAuthResendActivationEmailMutation(),
	});

	const onSend = async (data: any) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken,
			},
			body: {
				...data,
			},
		});
	};

	return (
		<>
			{status === 'success' ? (
				<ConfirmationEmailSent email={email.current as string} />
			) : (
				<RequestConfirmationEmailForm loading={isPending} onSubmit={onSend} messages={error?.messages} />
			)}
		</>
	);
}
