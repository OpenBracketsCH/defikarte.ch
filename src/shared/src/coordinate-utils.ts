/**
 * Formats a coordinate pair into a human-readable string
 * @param latitude - The latitude coordinate
 * @param longitude - The longitude coordinate
 * @param decimals - Number of decimal places (default: 6)
 * @returns Formatted coordinate string
 */
export function formatCoordinates(
  latitude: number,
  longitude: number,
  decimals: number = 6
): string {
  const lat = latitude.toFixed(decimals);
  const lng = longitude.toFixed(decimals);
  const latDir = latitude >= 0 ? "N" : "S";
  const lngDir = longitude >= 0 ? "E" : "W";

  return `${Math.abs(parseFloat(lat))}° ${latDir}, ${Math.abs(
    parseFloat(lng)
  )}° ${lngDir}`;
}

/**
 * Calculates the distance between two coordinates using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
