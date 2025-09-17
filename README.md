> ⚠️ **Project Notice**  
> This project is still under active development and is not yet production-ready. Expect breaking changes and unstable behavior.

# Next.js Frontend for Hybrid Session + JWT Authentication API

![Coverage badge](./badges/coverage.svg)

This frontend is built to interface with a secure backend that employs a hybrid authentication model, combining server-side sessions and JWT-based access control. It ensures strong security (via HTTP-only cookies) while allowing a responsive, stateless experience on the frontend using Next.js.


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