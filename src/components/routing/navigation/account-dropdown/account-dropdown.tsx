'use client';

import React from 'react';
import { Menu, Avatar, Text, Group, Divider } from '@mantine/core';
import { IconUser, IconLogout, IconSettings } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import {
	postAuthLogoutMutation,
	getAuthSessionQueryKey,
	getAuthSessionOptions,
} from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken } from '@/api/generated';
import { useRouter } from '@/i18n/navigation';
import { useQuery } from '@tanstack/react-query';
import { PrivateRoutes } from '@/routes';
import styles from './account-dropdown.module.css';

export default function AccountDropdown() {
	const t = useTranslations('navigation');
	const router = useRouter();

	// Get user session data
	const { data: sessionData } = useQuery({
		...getAuthSessionOptions(),
		queryKey: getAuthSessionQueryKey(),
		retry: false, // Don't retry on error to avoid loops
	});

	// Logout mutation
	const logoutMutation = useMutation({
		...postAuthLogoutMutation(),
		onSuccess: () => {
			router.replace('/login');
		},
	});

	const user = sessionData?.user;
	const userInitials = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

	const handleLogout = async () => {
		try {
			const csrfToken = (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken;
			if (!csrfToken) {
				console.error('Failed to get CSRF token');
				return;
			}
			logoutMutation.mutate({
				headers: {
					'x-csrf-token': csrfToken,
				},
			});
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const handleAccountClick = () => {
		router.push(PrivateRoutes.account);
	};

	if (!user) {
		return null;
	}

	return (
		<Menu shadow="md" width={220} position="bottom-end">
			<Menu.Target>
				<button className={styles.triggerButton}>
					<Avatar size="sm" radius="xl" className={styles.avatar}>
						{userInitials}
					</Avatar>
				</button>
			</Menu.Target>

			<Menu.Dropdown className={styles.dropdown}>
				<Menu.Label>
					<Group gap="sm">
						<Avatar size="sm" radius="xl" color="var(--color-semantic-brand-primary)">
							{userInitials}
						</Avatar>
						<div>
							<Text size="sm" fw={500} c="var(--color-semantic-text-primary)">
								{user.email}
							</Text>
							<Text size="xs" c="var(--color-semantic-text-secondary)">
								{user.enabled2FA ? '2FA Enabled' : '2FA Disabled'}
							</Text>
						</div>
					</Group>
				</Menu.Label>

				<Divider my="sm" />

				<Menu.Item
					leftSection={<IconSettings size={16} />}
					onClick={handleAccountClick}
					className={styles.menuItem}
				>
					{t('account')}
				</Menu.Item>

				<Menu.Item
					leftSection={<IconLogout size={16} />}
					onClick={handleLogout}
					className={styles.menuItem}
					color="red"
					disabled={logoutMutation.isPending}
				>
					{logoutMutation.isPending ? t('loggingOut') : t('logout')}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
