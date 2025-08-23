'use client';

import LoginForm from '@/components/auth/login-form';
import { useMutation } from '@tanstack/react-query';
import { postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken, LoginRequest } from '@/api/generated';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { PrivateRoutes } from '@/routes';

export default function LoginContainer() {
	const router = useRouter();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthLoginMutation() });

	useEffect(() => {
		if (status === 'success') {
			router.replace(PrivateRoutes.dashboard);
		}
	}, [status]);

	const handleLogin = async (data: LoginRequest) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken,
			},
			body: {
				...data,
			},
		});
	};

	return <LoginForm onSubmit={handleLogin} loading={isPending} messages={error?.messages} />;
}
