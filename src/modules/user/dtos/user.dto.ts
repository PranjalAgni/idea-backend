import { Email } from "@utils/types";
import {
	coerce,
	date,
	defaulted,
	Infer,
	number,
	object,
	size,
	string
} from "superstruct";

export const CreateUserStruct = object({
	username: Email,
	password: size(string(), 6),
	firstName: string(),
	lastName: string(),
	birthDate: date(),
	gender: string()
});

export const SigninUserStruct = object({
	username: Email,
	password: string()
});

export const ReadUserStruct = object({
	sortBy: defaulted(string(), "popular"),
	page: defaulted(
		coerce(number(), string(), (value) => +value),
		1
	),
	limit: defaulted(
		coerce(number(), string(), (value) => +value),
		10
	)
});

export const ReadUserByIdStruct = object({
	userId: coerce(number(), string(), (value) => +value)
});

export const CreateGithubUser = object({
	id: string(),
	accessToken: string(),
	refreshToken: string(),
	username: string(),
	_json: object()
});

export type CreateUserDto = Infer<typeof CreateUserStruct>;
export type ReadUserDto = Infer<typeof ReadUserStruct>;
export type ReadUserByIdDto = Infer<typeof ReadUserByIdStruct>;
export type CreateGithubUserDto = Infer<typeof CreateGithubUser>;
export type SigninUserDto = Infer<typeof SigninUserStruct>;
