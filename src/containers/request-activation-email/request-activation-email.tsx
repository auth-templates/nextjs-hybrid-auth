'use client';

import { RequestActivationEmailForm } from '../../components/auth/request-activation-email-form';
import ActivationEmailSent from '@/components/auth/activation-email-sent';
import { useMutation } from '@tanstack/react-query';
import { getCsrfToken } from '@/api/generated';
import { postAuthResendActivationEmailMutation } from '@/api/generated/@tanstack/react-query.gen';
import { useRef } from 'react';

export default function ResendConfirmationEmailContainer() {
	const { data, error, mutate, status, isPending } = useMutation({
		...postAuthResendActivationEmailMutation(),
	});

	const onSend = async (data: any) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken as string,
			},
			body: {
				...data,
			},
		});
	};

	return (
		<>
			{!error && status === 'success' ? (
				<ActivationEmailSent message={data?.messages[0].text as string} />
			) : (
				<RequestActivationEmailForm loading={isPending} onSubmit={onSend} messages={error?.messages} />
			)}
		</>
	);
}
