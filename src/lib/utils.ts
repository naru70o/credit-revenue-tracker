import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format the date
export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure 2 digits (e.g., 01, 02)
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Ensure 2 digits (e.g., 01, 02)
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats a number with commas as thousand separators.
 * Handles negative numbers and decimals.
 * Example: -1000 => "-1,000", 1234.56 => "1,234.56"
 */
export function formatAmount(number: number): string {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}