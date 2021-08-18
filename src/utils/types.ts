import { Response } from "express";
import { define } from "superstruct";
import isEmail from "is-email";

export const Email = define("Email", isEmail);

export type ResponseObject = {
	res: Response;
	status?: number;
	error?: Error | null;
	result: unknown;
};

export type JWTTokenData = {
	userId: number;
};

export type AuthorizationTokens = {
	refreshToken: string;
	accessToken: string;
};
