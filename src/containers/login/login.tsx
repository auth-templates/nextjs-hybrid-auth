'use client';

import LoginForm from '@/components/auth/login-form';
import { useMutation } from '@tanstack/react-query';
import { postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken, LoginRequest } from '@/api/generated';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { PrivateRoutes } from '@/routes';

export default function LoginContainer() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthLoginMutation() });

	useEffect(() => {
		if (status === 'success') {
			// Check if 2FA is required
			if (data?.enabled2FA) {
				// Redirect to 2FA verification page
				const redirectUrl = searchParams.get('redirect');
				const twoStepUrl = redirectUrl ? `/two-step?redirect=${encodeURIComponent(redirectUrl)}` : '/two-step';
				router.replace(twoStepUrl);
			} else {
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
		}
	}, [status, data, searchParams, router]);

	const handleLogin = async (data: LoginRequest) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken as string,
			},
			body: {
				...data,
			},
		});
	};

	return <LoginForm onSubmit={handleLogin} loading={isPending} messages={error?.messages} />;
}
