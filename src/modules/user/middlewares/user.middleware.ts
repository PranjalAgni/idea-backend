import express from "express";
import { assert } from "superstruct";
import {
	CreateUserStruct,
	ReadUserByIdStruct,
	SigninUserStruct
} from "../dtos/user.dto";
import httpErrors from "@common/exceptions/HttpErrors";

class UserMiddleware {
	private static instance: UserMiddleware;

	static getInstance() {
		if (!UserMiddleware.instance) {
			UserMiddleware.instance = new UserMiddleware();
		}
		return UserMiddleware.instance;
	}

	validateCreateUserBody(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		try {
			assert(req.body, CreateUserStruct);
			return next();
		} catch (ex) {
			return httpErrors.unprocessableEntityError(ex, res, next);
		}
	}

	validateSigninUserBody(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		try {
			assert(req.body, SigninUserStruct);
			return next();
		} catch (ex) {
			return httpErrors.unprocessableEntityError(ex, res, next);
		}
	}

	validateUserId(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		try {
			const params = req.params;
			assert(params, ReadUserByIdStruct);
		} catch (ex) {
			return httpErrors.unprocessableEntityError(ex, res, next);
		}
	}
}

export default UserMiddleware.getInstance();
