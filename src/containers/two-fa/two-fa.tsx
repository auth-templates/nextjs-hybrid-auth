'use client';

import TwoFAForm from '@/components/auth/two-fa-form';
import { useMutation } from '@tanstack/react-query';
import { postAuthVerify2FaMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken } from '@/api/generated';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { PrivateRoutes } from '@/routes';

export default function TwoFAContainer() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthVerify2FaMutation() });

	useEffect(() => {
		if (status === 'success') {
			// Check if there's a redirect parameter from middleware
			const redirectUrl = searchParams.get('redirect');

			if (redirectUrl) {
				// Redirect to the original requested page
				router.replace(redirectUrl);
			} else {
				// Default redirect to dashboard
				router.replace(PrivateRoutes.dashboard);
			}
		}
	}, [status, searchParams, router]);

	const handleTwoFA = async (data: { code: string }) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken as string,
			},
			body: {
				...data,
			},
		});
	};

	return <TwoFAForm onSubmit={handleTwoFA} loading={isPending} messages={error?.messages} />;
}
