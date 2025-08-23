'use client';

import { useRouter } from 'next/navigation';
import { PublicRoutes } from '../../routes';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postAuthSignupMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken, SignupRequest } from '@/api/generated';
import SignupForm from '@/components/auth/signup-form';

const SignupContainer = () => {
	const router = useRouter();
	const { data, error, mutate, status, isPending } = useMutation({ ...postAuthSignupMutation() });

	useEffect(() => {
		if (status === 'success') {
			router.push(PublicRoutes.login);
		}
	}, [status]);

	const onRegister = async (data: SignupRequest) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken,
			},
			body: {
				...data,
			},
		});
	};

	return <SignupForm onSubmit={onRegister} loading={isPending} messages={error?.messages} />;
};

export default SignupContainer;
