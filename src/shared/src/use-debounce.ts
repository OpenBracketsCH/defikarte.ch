//import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value
 * Useful for search inputs and other scenarios where you want to delay updates
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  return value + 'this is a test 2' as T;
}
