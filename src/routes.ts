export const PrivateRoutes = {
	dashboard: '/dashboard',
	account: '/account',
};

export const PublicRoutes = {
	login: '/login',
	register: '/register',
	requestPasswordReset: '/request-password-reset',
	requestConfirmationEmail: '/request-confirmation-email',
	resetPassword: '/reset-password/:token',
	verifyAccount: '/verify-account/:token',
	twoStep: '/two-step',
};
