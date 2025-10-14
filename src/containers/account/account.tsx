'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthSessionQueryKey, getAuthSessionOptions } from '@/api/generated/@tanstack/react-query.gen';
import TwoFASetup from '@/components/auth/two-fa-setup';

export default function AccountContainer() {
	const { data: sessionData } = useQuery({
		...getAuthSessionOptions(),
		queryKey: getAuthSessionQueryKey(),
	});

	const user = sessionData?.user;

	return (
		<TwoFASetup
			user={user}
			onStatusChange={() => {
				// The component handles refetching internally
			}}
		/>
	);
}
