import bcrypt from "bcrypt";

export async function hashedPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// function to compare password
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// function to generate a stars string of the same length as the password
export function generateStars(length: number): string {
  return "*".repeat(length);
}
