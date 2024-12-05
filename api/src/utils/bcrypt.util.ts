import bcrypt from "bcryptjs";

export async function isValidPassword(
  pwd: string,
  foundUserPwd: string,
): Promise<boolean> {
  const match = await bcrypt.compare(pwd, foundUserPwd);
  return match;
}

export async function hashPassword(pwd: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(pwd, 10);

  return hashedPassword;
}
