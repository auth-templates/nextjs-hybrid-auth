// Import all auth handlers
import { authLoginHandlers } from './auth-login';
import { authSignupHandlers } from './auth-signup';
import { authVerifySignupHandlers } from './auth-verify-signup';
import { authResendActivationHandlers } from './auth-resend-activation';
import { authLogoutHandlers } from './auth-logout';
import { authRefreshHandlers } from './auth-refresh';
import { authResetPasswordHandlers } from './auth-reset-password';
import { authAcceptTermsHandlers } from './auth-accept-terms';
import { authVerify2FaHandlers } from './auth-verify-2fa';
import { authSessionHandlers } from './auth-session';
import { twoFaSetupHandlers } from './2fa-setup';
import { twoFaVerifySetupHandlers } from './2fa-verify-setup';
import { twoFaDisableHandlers } from './2fa-disable';
import { twoFaRecoverHandlers } from './2fa-recover';
import { twoFaConfirmRecoverHandlers } from './2fa-confirm-recover';
import { csrfHandlers } from './csrf';

// All handlers combined
export const allApiHandlers = [
	...authLoginHandlers,
	...authSignupHandlers,
	...authVerifySignupHandlers,
	...authResendActivationHandlers,
	...authLogoutHandlers,
	...authRefreshHandlers,
	...authResetPasswordHandlers,
	...authAcceptTermsHandlers,
	...authVerify2FaHandlers,
	...authSessionHandlers,
	...twoFaSetupHandlers,
	...twoFaVerifySetupHandlers,
	...twoFaDisableHandlers,
	...twoFaRecoverHandlers,
	...twoFaConfirmRecoverHandlers,
	...csrfHandlers,
];
