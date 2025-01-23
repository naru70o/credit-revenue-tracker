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
