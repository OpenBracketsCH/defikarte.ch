# Quick Start Guide: Using Shared Code

## Overview

The `@defikarte/shared` package contains code that is shared between the React Native app and the React web application. This guide will help you understand how to use and extend the shared code.

## How It Works

This project uses **npm workspaces** to manage multiple packages in a single repository:

```
defikarte.ch/
├── package.json         # Root workspace configuration
├── app/                 # React Native app
├── web/                 # React web app
└── shared/              # Shared utilities and hooks
```

When you run `pnpm install` at the root level, pnpm automatically creates symlinks to the shared package in both `app/node_modules/@defikarte/shared` and `web/node_modules/@defikarte/shared`.

## Using Shared Code

### Step 1: Import from the Shared Package

In any file in `/app` or `/web`:

```typescript
import {
  formatCoordinates,
  calculateDistance,
  useDebounce,
} from "@defikarte/shared";
```

### Step 2: Use the Functions or Hooks

**Example: Format Coordinates**

```typescript
const formatted = formatCoordinates(47.3769, 8.5417);
// Result: "47.376900° N, 8.541700° E"
```

**Example: Calculate Distance**

```typescript
const distance = calculateDistance(47.3769, 8.5417, 46.948, 7.4474);
// Result: 73.82 (km from Zurich to Bern)
```

**Example: Use Debounce Hook**

```typescript
function SearchBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // This runs 300ms after user stops typing
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

## Adding New Shared Code

### Step 1: Create Your File

Add a new file in `/shared/src/`:

```typescript
// /shared/src/my-utility.ts
export function myNewFunction(param: string): string {
  return `Hello, ${param}!`;
}
```

### Step 2: Export from Index

Update `/shared/src/index.ts`:

```typescript
// Add this line
export { myNewFunction } from "./my-utility";
```

### Step 3: Use It

No need to reinstall! The workspace is already linked:

```typescript
import { myNewFunction } from "@defikarte/shared";

myNewFunction("World"); // "Hello, World!"
```

## TypeScript Support

TypeScript automatically picks up types from the shared package because:

1. The shared package's `package.json` specifies: `"types": "src/index.ts"`
2. Both app and web projects have TypeScript configured
3. npm workspaces create proper symlinks

## Development Tips

### 1. Hot Reload Works

Changes in `/shared` will trigger hot reload in both app and web (as long as dev servers are running).

### 2. Keep It Platform-Agnostic

Only put code in `/shared` that works on both React Native and React web:

- ✅ Pure utility functions
- ✅ React hooks
- ✅ TypeScript types/interfaces
- ✅ Business logic
- ❌ React Native specific components (`View`, `Text`, etc.)
- ❌ Web-only APIs (`document`, `window`, etc.)

### 3. Test Your Shared Code

Consider adding tests in `/shared` to ensure reliability:

```bash
cd shared
pnpm install --save-dev jest @types/jest
```

### 4. Add Dependencies to Shared Package

If your shared code needs a library:

```bash
cd shared
pnpm install <package-name>
```

Then update `/shared/package.json` to mark it as a peer dependency if needed.

## Common Patterns

### Shared Types/Interfaces

```typescript
// /shared/src/types.ts
export interface AEDLocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
}
```

### Shared Constants

```typescript
// /shared/src/constants.ts
export const MAP_CENTER = {
  latitude: 46.8182,
  longitude: 8.2275,
};

export const DEFAULT_ZOOM = 8;
```

### Shared Validation Logic

```typescript
// /shared/src/validators.ts
export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
```

## Troubleshooting

### "Cannot find module '@defikarte/shared'"

Run from the root:

```bash
pnpm install
```

### Changes in `/shared` Not Reflected

1. Make sure your dev server is running
2. Try stopping and restarting the dev server
3. Clear the cache:
   - App: `cd app && pnpm start -- --clear`
   - Web: Delete `web/.vite` folder

### TypeScript Errors in Shared Package

Make sure you've installed dependencies:

```bash
cd shared
npm install
```

## Need Help?

See the example files:

- `/app/examples/shared-code-example.tsx`
- `/web/src/examples/shared-code-example.tsx`
- `/shared/README.md`
