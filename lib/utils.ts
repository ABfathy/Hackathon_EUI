import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates age from date of birth
 * @param dateOfBirth Date of birth as string or Date object
 * @returns Age as a number, or null if calculation fails
 */
export function calculateAge(dateOfBirth: string | Date | null): number | null {
  if (!dateOfBirth) return null;
  
  try {
    const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
    
    // Check if date is valid
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid date format:", dateOfBirth);
      return null;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Validate reasonable age range (0-120)
    if (age < 0 || age > 120) {
      console.warn("Calculated age outside reasonable range:", age);
      // Still return the age, but log a warning
    }
    
    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return null;
  }
}
