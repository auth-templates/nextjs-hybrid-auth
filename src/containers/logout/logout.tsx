'use client';

import { useMutation } from '@tanstack/react-query';
import { postAuthLogoutMutation } from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken } from '@/api/generated';
import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Box, Button } from '@mantine/core';
import { CustomLoadingOverlay } from '@/components/auth/custom-loading-overlay';

export default function LogoutContainer() {
	const [loadingInProgress, setLoading] = useState(false);
	const router = useRouter();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthLogoutMutation() });
	console.log(data, error);
	useEffect(() => {
		if (status === 'success') {
			router.replace('http://localhost:3000/login');
		}
	}, [status]);

	const handleLogout = async () => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken,
			},
		});
	};

	return (
		<Box pos="relative">
			<CustomLoadingOverlay
				visible={loadingInProgress}
				onTransitionStart={() => setLoading(true)}
				onTransitionEnd={() => setLoading(false)}
			/>
			<Button onClick={handleLogout}>Logout</Button>
		</Box>
	);
}
