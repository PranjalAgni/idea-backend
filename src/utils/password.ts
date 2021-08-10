import argon from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
	const hashedPassword = await argon.hash(password);
	return hashedPassword;
};

export const comparePassword = async (
	hashedPassword: string,
	password: string
): Promise<boolean> => {
	const isPasswordMatching = await argon.verify(hashedPassword, password);
	return isPasswordMatching;
};
