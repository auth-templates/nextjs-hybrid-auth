export const PrivateRoutes = {
    dashboard: '/dashboard',
    account: '/account',
    leaves: '/leaves'
};

export const PublicRoutes = {
    login: '/login',
    register: '/register',
    recoverPassword: '/recover-password',
    resendConfirmationEmail: '/resend-confirmation-email',
    resetPassword: '/reset-password/:token',
    verifyAccount: '/verify-account/:token',
    twoStep: '/two-step',
}