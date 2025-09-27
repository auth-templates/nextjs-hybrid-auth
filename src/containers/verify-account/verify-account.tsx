'use client';

import VerifyAccount from '../../components/auth/verify-account';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getCsrfToken, VerifyTokenRequest } from '@/api/generated';
import { postAuthVerifySignupMutation } from '@/api/generated/@tanstack/react-query.gen';
import AccountVerified from '@/components/auth/account-verified';

export default function VerifyAccountContainer() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const { data, error, mutate, status, isPending } = useMutation({
		...postAuthVerifySignupMutation(),
	});
	console.log('token', token);

	useEffect(() => {
		console.log('token', token);
		if (token) {
			verify({ token });
		}
	}, [token]);

	const verify = async (data: VerifyTokenRequest) => {
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
			{status === 'success' ? (
				<AccountVerified />
			) : (
				<VerifyAccount messages={error?.messages} loading={isPending} />
			)}
		</>
	);
}
