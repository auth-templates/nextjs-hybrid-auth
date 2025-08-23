import { passwordStrength } from 'check-password-strength';

export const validatePassword = (password: string) => {
	const result = passwordStrength(password);
	return result.value === 'Medium' || result.value === 'Strong';
};
