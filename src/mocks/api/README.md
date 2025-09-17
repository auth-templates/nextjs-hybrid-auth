# MSW API Mocks

This directory contains Mock Service Worker (MSW) handlers for the authentication API endpoints based on the OpenAPI specification. The mocks are organized by container to provide comprehensive test scenarios for each component.

## Container-Specific Files

### `login.ts`
Comprehensive scenarios for the **Login Container** (`postAuthLoginMutation`):
- Invalid email format
- Email not found
- Wrong password
- Account not verified
- Account locked/suspended
- Network/server errors
- Rate limiting
- Successful login without 2FA
- Successful login with 2FA required
- Custom referrer scenarios

### `signup.ts`
Comprehensive scenarios for the **Signup Container** (`postAuthSignupMutation`):
- Email already exists
- Invalid email format
- Weak password validation
- Terms not accepted
- Missing required fields
- Network/server errors
- Rate limiting
- Email domain blocking
- Successful signup

### `verify-account.ts`
Comprehensive scenarios for the **Verify Account Container** (`postAuthVerifySignupMutation`):
- Invalid token format
- Expired token
- Token already used
- Token not found
- Account already verified
- Network/server errors
- Rate limiting
- Successful verification

### `request-activation-email.ts`
Comprehensive scenarios for the **Request Activation Email Container** (`postAuthResendActivationEmailMutation`):
- Invalid email format
- Email not found
- Account already verified
- Too many resend attempts
- Account locked/suspended
- Network/server errors
- Email service unavailable
- Generic security response

### `request-password-reset.ts`
Comprehensive scenarios for the **Request Password Reset Container** (`postAuthResetPasswordRequestMutation`):
- Invalid email format
- Email not found (security response)
- Too many reset requests
- Account locked/suspended
- Network/server errors
- Email service unavailable
- Account not verified
- Generic security response

### `reset-password.ts`
Comprehensive scenarios for the **Reset Password Container** (`postAuthResetPasswordMutation`):
- Invalid token format
- Expired token
- Token already used
- Token not found
- Weak password validation
- Password same as current
- Password confirmation mismatch
- Network/server errors
- Rate limiting
- Account locked/suspended
- Successful password reset

### `logout.ts`
Comprehensive scenarios for the **Logout Container** (`postAuthLogoutMutation`):
- No active session
- Invalid session
- Session expired
- Network/server errors
- Rate limiting
- Successful logout

### `csrf-comprehensive.ts`
Comprehensive scenarios for **CSRF Token** (`getCsrfToken`):
- Rate limiting
- Server errors
- Service unavailable
- Successful token generation with proper cookies

## Core Files

### `auth.ts`
Comprehensive authentication endpoint mocks including:
- `POST /auth/login` - User login with comprehensive scenarios
- `POST /auth/signup` - User registration with comprehensive scenarios
- `POST /auth/verify-signup` - Email verification with comprehensive scenarios
- `POST /auth/resend-activation-email` - Resend activation email with comprehensive scenarios
- `POST /auth/logout` - User logout with comprehensive scenarios
- `POST /auth/refresh` - Token refresh
- `POST /auth/reset-password/request` - Request password reset with comprehensive scenarios
- `POST /auth/reset-password` - Confirm password reset with comprehensive scenarios
- `POST /auth/accept-terms` - Accept terms and conditions
- `POST /auth/verify-2fa` - Verify 2FA code with comprehensive scenarios
- `GET /auth/session` - Get current session with comprehensive scenarios

### `2fa.ts`
Two-factor authentication endpoint mocks:
- `POST /2fa/setup` - Initialize 2FA setup
- `POST /2fa/verify-setup` - Verify 2FA setup code
- `DELETE /2fa/disable` - Disable 2FA
- `POST /2fa/recover` - Request 2FA recovery
- `POST /2fa/confirm-recover` - Confirm 2FA recovery

### `csrf.ts`
Comprehensive CSRF token endpoint mocks:
- `GET /csrf/token` - Get CSRF token with comprehensive scenarios

### `index.ts`
Exports all handlers and provides container-specific handler groups.

## Usage

### Using All Handlers
```typescript
import { allApiHandlers } from '@/mocks/api';

// Use in your MSW setup
setupWorker(...allApiHandlers);
```

### Using Container-Specific Handlers
```typescript
import { 
  loginContainerHandlers,
  signupContainerHandlers,
  verifyAccountContainerHandlers,
  requestActivationEmailContainerHandlers,
  requestPasswordResetContainerHandlers,
  resetPasswordContainerHandlers,
  logoutContainerHandlers
} from '@/mocks/api';

// Use specific container handlers for focused testing
setupWorker(...loginContainerHandlers);
```

### Individual Handler Files
```typescript
import { loginHandlers } from '@/mocks/api/login';
import { csrfHandlers } from '@/mocks/api/csrf';

// Combine specific handlers
setupWorker(...loginHandlers, ...csrfHandlers);
```

## Features

- **Type Safety**: All handlers use generated TypeScript types from the OpenAPI spec
- **Security**: Proper CSRF token validation
- **Session Management**: Cookie-based session and token validation
- **Error Handling**: Comprehensive error scenarios for testing
- **Test Cases**: Built-in test cases for various scenarios (invalid credentials, network failures, etc.)

## Test Scenarios

### Login (`/auth/login`)
- `email: 'message'` - Returns 404 with "Email is invalid"
- `email: 'invalidpassword@mail.com'` - Returns 400 with error messages
- `email: 'networkfail@mail.com'` - Returns 400 (network failure simulation)
- Valid credentials - Returns success with 2FA status and referrer

### Signup (`/auth/signup`)
- `email: 'invalid@test.com'` - Returns 400 with "Email already exists"
- Valid signup - Returns success message

### Password Reset (`/auth/reset-password`)
- `token: 'invalid-token'` - Returns 400 with "Invalid or expired reset token"
- Valid token - Returns success message

### 2FA (`/2fa/setup`, `/2fa/verify-setup`)
- `code: '000000'` - Returns 400 with "Invalid 2FA setup code"
- Valid code - Returns success message

## Security Considerations

- All POST requests require valid CSRF tokens
- Session endpoints require both `connect.sid` and `access_token` cookies
- Generic responses for security-sensitive endpoints (password reset, email resend)
- Proper HTTP status codes matching the API specification

## Integration

These mocks are designed to work seamlessly with the generated API client and provide realistic responses for development and testing scenarios.
