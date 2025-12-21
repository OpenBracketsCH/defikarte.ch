// Example usage of shared code in the web project
// Import this in your components where you need these utilities

import { formatCoordinates, calculateDistance, useDebounce } from '@defikarte/shared';
import { useEffect, useState } from 'react';

// Example 1: Format coordinates
export function exampleFormatCoordinates() {
  const zurichLat = 47.3769;
  const zurichLng = 8.5417;

  const formatted = formatCoordinates(zurichLat, zurichLng);
  console.log('Zurich coordinates:', formatted);
  // Output: "47.376900° N, 8.541700° E"
}

// Example 2: Calculate distance between two points
export function exampleCalculateDistance() {
  // Zurich coordinates
  const zurichLat = 47.3769;
  const zurichLng = 8.5417;

  // Bern coordinates
  const bernLat = 46.948;
  const bernLng = 7.4474;

  const distance = calculateDistance(zurichLat, zurichLng, bernLat, bernLng);
  console.log(`Distance from Zurich to Bern: ${distance.toFixed(2)} km`);
  // Output: "Distance from Zurich to Bern: 73.82 km"
}

// Example 3: Using the useDebounce hook in a React component
export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search only after user stops typing for 500ms
      console.log('Searching for:', debouncedSearchTerm);
      // Your search logic here
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>{debouncedSearchTerm}</p>
    </>
  );
}
