'use client';

import RequestPasswordResetForm from '../../components/auth/request-password-reset-form';
import { useMutation } from '@tanstack/react-query';
import { postAuthResetPasswordRequestMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken, StatusCode } from '@/api/generated';
import ResetPasswordEmailSent from '@/components/auth/reset-password-email-sent';
import { useRef } from 'react';

export default function RequestPasswordResetContainer() {
	const email = useRef('');
	const { data, error, mutate, status, isPending } = useMutation({
		...postAuthResetPasswordRequestMutation(),
	});

	const onSend = async (data: any) => {
		email.current = data.userEmail;
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken as string,
			},
			body: {
				...data,
			},
		});
	};

	const messages = data?.code === StatusCode.PASSWORD_RESET_NOT_INITIATED ? data.messages : error?.messages;

	return (
		<>
			{!error && status === 'success' && data?.code !== StatusCode.PASSWORD_RESET_NOT_INITIATED ? (
				<ResetPasswordEmailSent email={email.current} />
			) : (
				<RequestPasswordResetForm loading={isPending} onSubmit={onSend} messages={messages} />
			)}
		</>
	);
}
