'use client';

import ResetPasswordForm from '../../components/auth/reset-password-form';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthResetPasswordMutation } from '@/api/generated/@tanstack/react-query.gen';
import { ConfirmResetPasswordRequest, getCsrfToken } from '@/api/generated';
import PasswordUpdated from '@/components/auth/password-updated';

export default function ResetPasswordContainer() {
	const { token } = useParams<{ token: string }>();
	const { data, error, mutate, status, isPending } = useMutation({
		...postAuthResetPasswordMutation(),
	});

	const onSubmit = async (data: Omit<ConfirmResetPasswordRequest, 'token'>) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken as string,
			},
			body: {
				...data,
				token: token,
			},
		});
	};

	return (
		<>
			{!error && status === 'success' ? (
				<PasswordUpdated />
			) : (
				<ResetPasswordForm loading={isPending} onSubmit={onSubmit} messages={error?.messages} />
			)}
		</>
	);
}
