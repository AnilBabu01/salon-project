/**
 * Generates a 6-digit One-Time Password (OTP).
 * 
 * @returns {string} A string representing a 6-digit OTP.
 * @throws {Error} Throws an error if the generated OTP is not a 6-digit number.
 */
export function generateOTP(): string {
  // Generate a random number between 100000 and 999999
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Ensure the OTP is always 6 digits
  const otpString = otp.toString();
  if (otpString.length !== 6) {
    throw new Error("Generated OTP is not a 6-digit number.");
  }

  return otpString;
}