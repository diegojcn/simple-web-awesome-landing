# AI Coding Agent Instructions for simple-web-awesome-landing

## Project Overview
This is a React 19 landing page for Safe 4 Talk (language practice app) built with Vite, TypeScript, and Web Awesome (web components library). The app showcases app features and drives traffic to Google Play.

## Architecture & Core Patterns

### Web Components Integration (Critical)
- Uses `@awesome.me/webawesome` library (v3.0.0) for all UI components
- React 19 natively supports custom elements - no wrapper libraries needed
- Components must be imported in two places:
  1. `src/main.tsx` - base component imports for app initialization
  2. `src/App.tsx` - additional component imports as needed for specific sections
  
- Custom elements declared in `src/custom-elements.d.ts` as JSX intrinsic elements (e.g., `wa-icon`, `wa-button`, `wa-card`)
- Component names follow pattern: `wa-<component-name>` (e.g., `<wa-button>`, `<wa-carousel>`)

### Styling & Web Awesome Theme
- Theme applied at root HTML element: `<html class="wa-theme-default">`
- Styles loaded via CDN links in `index.html` (3 stylesheets):
  - `themes/default.css` - component theming
  - `native.css` - native HTML element styles
  - `utilities.css` - utility classes
- Component-level CSS in dedicated `.css` files (e.g., `App.css`) alongside React components

### Entry Point & Component Hierarchy
- `src/main.tsx` - app initialization with React 19 `createRoot`
- `src/App.tsx` - main component (~264 lines) handling:
  - A/B headline variants (3 variants, randomly selected)
  - Platform-specific app store routing (Android detection via user agent)
  - UTM parameters for campaign tracking
  - Popover API for "install tip" guidance
  - Web component composition (carousel, rating, dialog, drawer, etc.)

### Custom Elements Type Safety
- TypeScript recognizes web components through `@awesome.me/webawesome/dist/custom-elements-jsx.d.ts`
- Extend `src/custom-elements.d.ts` when adding new components from Web Awesome
- Use `any` type for component props (Web Awesome components don't expose strict typing)
- Component refs use `useRef<any>(null)` pattern

## Build & Development Workflow

### Commands
- `npm run dev` - Start Vite dev server (hot reload enabled)
- `npm run build` - TypeScript compilation + Vite production build
  - Compiles TS first: `tsc -b` (uses project references)
  - Then bundles with Vite
- `npm run lint` - ESLint check (Flat Config)
- `npm run preview` - Preview production build locally
- `npm run svgo` - Optimize SVG files in `src/assets/` directory

### Important: TypeScript Project References
- `tsconfig.json` references three config files:
  - `tsconfig.app.json` - app source code
  - `tsconfig.node.json` - build tooling (vite.config.ts)
- Always run `tsc -b` before `vite build` to ensure proper type checking across project boundaries

## Code Patterns & Conventions

### React Hooks Usage
- Use `useState` for client-side state (e.g., A/B variants, ready flag)
- Use `useEffect` with `[]` dependency for one-time initialization (setting ready state, popover listeners)
- Use `useMemo` for computed values that depend on browser APIs (e.g., user agent detection for platform routing)
- Refs via `useRef<any>(null)` for accessing Web Awesome component DOM methods

### A/B Testing Pattern
```tsx
const [variant] = useState(() => Math.floor(Math.random() * HEADLINES.length))
// Select headline based on variant index
```
When adding new experiments: add items to relevant arrays and reference by `variant` index.

### Platform Routing Pattern
- Detect via `navigator.userAgent.toLowerCase()` regex test
- Android detection: `/android|huawei|xiaomi|samsung|pixel/.test(ua)`
- Returns platform-specific URL (currently Play Store for all)
- Extensible for iOS, web, etc.

### UTM Parameters
- Pattern: `?${utm_source}&${utm_medium}&${utm_campaign}`
- Used for analytics attribution in app store links
- Defined as constants: `PLAY_URL`, `CAMPAIGN`, `PLAY_URL_UTM`

## Linting & Code Quality

### ESLint Configuration (Flat Config)
- Located in `eslint.config.js` (flat config syntax)
- Extends: `@eslint/js` + TypeScript ESLint + React Hooks + React Refresh
- Ignores: `dist/` directory
- Applies to all `.ts` and `.tsx` files
- Run `npm run lint` before commits

### TypeScript Strict Settings
- Target: `ES2022`
- Modules: `ESNext` with `Bundler` resolution
- JSX: `react-jsx` (React 17+)
- Isolated modules & no emit (Vite handles bundling)

## External Dependencies

### Key Libraries
- **@awesome.me/webawesome** (3.0.0) - web components for UI
- **react & react-dom** (19.2.0) - React framework
- **vite** (7.2.2) - build tool & dev server
- **typescript** (~5.9.3) - type checking
- **svgo** (4.0.0) - SVG optimization utility
- **eslint** + plugins - linting

### Adding New Web Awesome Components
1. Import component JS in `src/main.tsx`: `import '@awesome.me/webawesome/dist/components/<component>/<component>.js'`
2. Add component to `src/App.tsx` if used there
3. Declare JSX element type in `src/custom-elements.d.ts`
4. Use in JSX as lowercase kebab-case: `<wa-component-name>`

## File Structure Reference
- `src/App.tsx` - Main app component (headline variants, routing, popover, web components)
- `src/main.tsx` - React entry point with Web Awesome imports
- `src/custom-elements.d.ts` - JSX type declarations for web components
- `src/App.css`, `src/index.css`, `src/style.css` - Styling (component + global)
- `public/`, `src/assets/` - Static assets (SVGs, images)
- `vite.config.ts` - Vite config (React plugin)
- `eslint.config.js` - Linting rules (Flat Config)
- `tsconfig*.json` - TypeScript project references configuration
