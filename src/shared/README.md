# @defikarte/shared

Shared code between the React Native app and React web application.

## Structure

```
shared/
├── src/
│   ├── index.ts              # Main export file
│   ├── coordinate-utils.ts   # Coordinate utilities
│   └── use-debounce.ts       # Custom React hooks
├── package.json
└── tsconfig.json
```

## Usage

### In the Web Project

```typescript
import {
  formatCoordinates,
  calculateDistance,
  useDebounce,
} from "@defikarte/shared";

// Use coordinate utilities
const formatted = formatCoordinates(47.3769, 8.5417);
const distance = calculateDistance(47.3769, 8.5417, 46.948, 7.4474);

// Use React hook
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### In the App Project

```typescript
import {
  formatCoordinates,
  calculateDistance,
  useDebounce,
} from "@defikarte/shared";

// Same usage as above
```

## Adding New Shared Code

1. Create your new file in `src/`
2. Export it from `src/index.ts`
3. Run `npm install` from the root to update workspace links
4. Import and use in your projects

## Available Functions

### `formatCoordinates(latitude, longitude, decimals?)`

Formats coordinates into a human-readable string with cardinal directions.

**Example:**

```typescript
formatCoordinates(47.3769, 8.5417);
// Returns: "47.376900° N, 8.541700° E"
```

### `calculateDistance(lat1, lon1, lat2, lon2)`

Calculates the distance between two coordinates using the Haversine formula.

**Returns:** Distance in kilometers

**Example:**

```typescript
calculateDistance(47.3769, 8.5417, 46.948, 7.4474);
// Returns: ~73.8 (km)
```

## Available Hooks

### `useDebounce<T>(value, delay?)`

Debounces a value with a specified delay (default 500ms).

**Example:**

```typescript
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  // This will only run 300ms after the user stops typing
  performSearch(debouncedSearch);
}, [debouncedSearch]);
```
