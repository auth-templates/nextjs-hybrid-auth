> ⚠️ **Project Notice**  
> This project is still under active development and is not yet production-ready. Expect breaking changes and unstable behavior.

# Next.js Frontend for Hybrid Session + JWT Authentication API

![Coverage badge](./badges/coverage.svg)

This frontend is built to interface with a secure backend that employs a hybrid authentication model, combining server-side sessions and JWT-based access control. It ensures strong security (via HTTP-only cookies) while allowing a responsive, stateless experience on the frontend using Next.js.

## Authentication Architecture

### Hybrid Authentication Model

This application uses a **hybrid authentication approach** that combines the security of server-side sessions with the flexibility of JWT tokens:

- **`connect.sid`**: Express session ID cookie (server-side session store)
- **`access_token`**: Short-lived JWT used for API access control
- **`refresh_token`**: Long-lived token used to renew access tokens

### Middleware Authentication Strategy

The authentication middleware (`src/middleware.ts`) uses a **hybrid validation approach** that combines fast local JWT verification with backend session validation when needed. This provides optimal performance while maintaining security.

#### Authentication Flow

1. **Fast Fail Check**: Verifies presence of required cookies (`connect.sid`, `refresh_token`)
2. **Local JWT Verification**: Validates access token signature locally (if present)
3. **Backend Session Validation**: Calls backend only when access token is invalid/missing
4. **Performance Optimized**: Backend calls are rare due to 15-minute access token lifetime

#### Why This Approach is Optimal

1. **Fast Performance**: Local JWT verification (~1ms) for valid tokens
2. **Accurate Validation**: Backend session validation ensures authenticity
3. **Security**: HTTP-only cookies prevent XSS attacks
4. **User Experience**: Seamless token refresh handled client-side
5. **Scalability**: Minimal backend load with smart validation strategy

#### Authentication Libraries Using Cookie Verification

This cookie-based authentication approach is widely adopted across the industry. The following solutions are commonly used with Next.js and implement client-side token refresh similar to this implementation:

**NextAuth.js** - The most popular Next.js authentication library
- Uses `next-auth` cookies (`next-auth.session-token`, `next-auth.csrf-token`)
- Middleware checks cookie presence before validating JWT signatures
- **Client-side refresh**: Automatically refreshes tokens in the background
- Supports both JWT and database session strategies

**Auth0** - Enterprise authentication platform
- Uses `appSession` and `auth0` cookies for session management
- Middleware validates cookie existence before backend verification
- **Client-side refresh**: Auth0 SDK handles token refresh automatically
- Implements automatic token refresh with cookie-based storage

**Other popular solutions** that use similar approaches include Clerk, Supabase Auth, Auth.js, and Lucia Auth - all implementing cookie-based middleware checks with client-side token refresh.

**Note**: Solutions like Firebase Auth, AWS Cognito, and Keycloak are less commonly used directly with Next.js middleware and typically require custom implementation for client-side token refresh.

This widespread adoption demonstrates that cookie-based authentication middleware with client-side token refresh is a proven, secure, and performant approach used by industry leaders and open-source projects alike.

#### Performance Characteristics

**Optimized Performance**: The hybrid approach provides optimal performance characteristics:

- **Missing cookies**: ~1ms (immediate redirect to login)
- **Valid access token**: ~1ms (local JWT signature verification)
- **Invalid/missing access token**: ~50-100ms (backend session validation)
- **Backend calls**: Rare due to 15-minute access token lifetime

**Why backend calls are minimal**:
- Access tokens have a 15-minute lifetime
- Most user sessions are shorter than 15 minutes
- Client-side refresh prevents token expiration
- Backend validation only occurs when access token is invalid/missing

**Trade-off**: Performance vs Security - This implementation provides both optimal performance and strong security through Redis-backed session validation.

#### How It Works

```typescript
import { jwtVerify } from 'jose';

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookies = request.cookies;
  
  // Fast fail: Check for required authentication cookies
  const hasSessionCookie = cookies.has('connect.sid');
  const hasRefreshToken = cookies.has('refresh_token');
  
  // Session ID and refresh token must always be present
  if (!hasSessionCookie || !hasRefreshToken) {
    return false;
  }
  
  // Check for access token (optional)
  const accessToken = cookies.get('access_token')?.value;
  
  if (accessToken) {
    try {
      // Verify access token signature locally using jose (Edge Runtime compatible)
      const isValid = await verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET!);
      if (isValid) {
        return true;
      }
    } catch (error) {
      console.warn('Access token verification failed:', error);
    }
    
    // Access token invalid/expired, validate session via backend
    return await validateSession(request);
  }
  
  // No access token, validate session via backend
  return await validateSession(request);
}

async function validateSession(request: NextRequest): Promise<boolean> {
  const sessionId = request.cookies.get('connect.sid')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // Make request to backend to validate session
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `connect.sid=${sessionId}; refresh_token=${refreshToken}`,
    },
    redirect: 'manual',
  });
  
  return response.status === 200;
}
```

#### Authentication Flow

1. **User visits protected route** (e.g., `/dashboard`)
2. **Fast fail check** → Verifies presence of `connect.sid` and `refresh_token` cookies
3. **Access token validation** → If present, validates JWT signature locally (~1ms)
4. **Backend session validation** → If access token invalid/missing, validates session via backend (~50-100ms)
5. **Page loads** → Client-side code handles token refresh automatically
6. **Seamless experience** → User continues without interruption

#### Security Considerations

- **HTTP-only cookies**: Prevent XSS attacks by making cookies inaccessible to JavaScript
- **Secure cookies**: Only transmitted over HTTPS in production
- **SameSite protection**: Prevents CSRF attacks
- **Short-lived access tokens**: Minimize exposure window if compromised (15 minutes)
- **Access token signature verification**: Validates token integrity and prevents tampering
- **Backend session validation**: Ensures session authenticity via Redis-backed validation
- **Required cookies**: Both session ID and refresh token must be present for authentication

#### Token Refresh Strategy

The application handles token expiration gracefully through client-side refresh logic:

- **Proactive refresh**: Tokens refreshed before expiration
- **Reactive refresh**: Automatic refresh on 401 responses
- **Fallback handling**: Redirect to login only if refresh fails

This approach ensures users rarely see authentication interruptions while maintaining strong security through proper cookie handling and backend validation.

#### Implementation Details

The token refresh strategy is implemented across several key files:

**1. Core Refresh Logic** (`src/api/fetcher.ts`)
```typescript
// Lines 9-39: refreshToken() function
async function refreshToken(): Promise<void> {
  // Prevents multiple simultaneous refresh attempts
  if (isRefreshing) {
    return new Promise((resolve) => {
      pendingRequests.push(resolve);
    });
  }
  
  // Calls /auth/refresh endpoint with CSRF protection
  const response = await fetch(`${BASE_SERVER_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'x-csrf-token': csrfToken },
  });
}

// Lines 41-63: customFetch wrapper
export const customFetch: typeof fetch = async (input, init) => {
  let response = await fetch(input, { ...init, credentials: 'include' });
  
  if (response.status === 401) {
    try {
      await refreshToken(); // Automatic refresh on 401
      response = await fetch(input, { ...init, credentials: 'include' }); // Retry
    } catch (err) {
      window.location.replace(LOGIN_URL); // Fallback to login
    }
  }
  
  return response;
};
```

**2. API Client Configuration** (`fetch-client-config.ts`)
```typescript
// Lines 6-11: Configure generated API client to use customFetch
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: 'http://localhost:3001',
  fetch: customFetch, // All API calls use the refresh-enabled fetch
  credentials: 'include',
});
```

**3. Generated API Integration** (`src/api/generated/@tanstack/react-query.gen.ts`)
- Lines 410-449: `postAuthRefreshMutation` and related React Query hooks
- Provides typed access to the refresh endpoint for manual refresh scenarios

**4. Usage in Components**
- All API calls automatically use the refresh-enabled `customFetch`
- Components don't need to handle token expiration manually
- Refresh happens transparently in the background

**Key Features:**
- **Concurrent Request Handling**: Multiple 401s trigger a single refresh attempt
- **Request Queuing**: Pending requests wait for refresh completion
- **Automatic Retry**: Failed requests are retried after successful refresh
- **CSRF Protection**: All refresh requests include CSRF tokens
- **Graceful Degradation**: Redirects to login only when refresh fails


### Available Scripts
| Script                        | Description                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run format`              | Formats all code using Prettier.                                                                  |
| `npm run codegen`             | Generates TypeScript types from OpenAPI specs.                                                    |
| `npm run test`                | Runs Jest tests in watch mode.                                                                    |
| `npm run coverage`            | Runs Jest with coverage report and prints report path.                                            |
| `npm run test:ci`             | Runs Jest in CI mode with coverage.                                                               |
| `npm run dev`                 | Starts Next.js development server.                                                                |
| `npm run build`               | Builds the Next.js application for production.                                                    |
| `npm run start`               | Starts the application using Docker Compose.                                                      |
| `npm run lint`                | Runs ESLint on the project.                                                                       |
| `npm run prepare`             | Initializes Husky Git hooks.                                                                      |
| `npm run start:backend-local` | Starts local backend services (Postgres, Redis, SMTP), runs migrations, and starts API container. |
| `npm run generate:tokens`     | Builds design tokens (colors, spacing, radius, breakpoints) using Style Dictionary.               |


#### App Router setup with i18n routing
[Documentation](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
[Source code](https://github.com/amannn/next-intl/tree/main/examples/example-app-router)


### Mantine Theme Setup in the App

The app uses Mantine as the component library and integrates it with a custom design system using CSS variables generated via Style Dictionary. This allows dynamic theming with semantic colors, spacing, breakpoints, and border radii, including automatic dark/light mode support.

**Theme Configuration:** (src\theme\theme.ts)
```javascript 
export const theme: MantineThemeOverride = {
  // Semantic colors
  colors: colors,
  primaryColor: 'blue', // default primary color, can be any semantic color

  // Border radius
  radius: {
    sm: 'var(--border-radius-sm)',
    ...
  },

  // Spacing
  spacing: {
    xs: 'var(--spacing-xs)',
    ...
  },

  // Breakpoints
  breakpoints: {
    sm: 'var(--breakpoints-sm)',
    ...
  },
};
```
- Components use semantic colors via CSS variables, so dark/light mode switches automatically.

- Base colors provide Mantine’s 10-shade arrays for gradients, hovers, and **primaryColor**. The primaryColor sets the default brand color for the app. Mantine uses it for buttons, links, active states, and other components that rely on the main color. __It maps automatically to the corresponding color array__ (e.g., ```blue[0] → blue[9]```) so hover, focus, and gradient shades are applied consistently.

- Spacing, border radius, and breakpoints all use CSS variables for consistency.

- Dark mode works out of the box via __media queries__.

### Token Build Process

The project uses [Style Dictionary](https://styledictionary.com/) to generate CSS variable files from JSON token sources. Tokens are split into **light** colors, **dark** colors, and **foundation** tokens (spacing, border-radius, breakpoints).

#### Process overview:

1. **Light theme colors**

- Source: ```src/tokens/colors/light.json```

- Output: ```src/tokens/generated/css/colors-light.css```

- Custom format generates CSS variables under ``:root``.

2. **Dark theme colors**

- Source: ```src/tokens/colors/dark.json```

- Output: ```src/tokens/generated/css/colors-dark.css```

- Custom format wraps variables in ```@media (prefers-color-scheme: dark)``` for automatic dark mode support.

3. **Foundation tokens**

- Source: ```src/tokens/foundation/*.json```

- Output: ```src/tokens/generated/css/foundation.css```

- Includes spacing, border-radius, and breakpoints as CSS variables.

**Usage:**

```bash
npm run generate:tokens
```

This generates all CSS variable files, which can then be referenced in the app for theme configuration and component styling.

__Notes:__

- All generated files include a header warning: ```Do not edit directly, this file was auto-generated.```

- CSS variables allow consistent design system application and automatic switching between light and dark mode.