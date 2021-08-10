import {
	CreateGithubUserDto,
	CreateUserDto,
	ReadUserByIdStruct,
	ReadUserStruct,
	SigninUserDto
} from "@user/dtos/user.dto";
import userService from "@user/services/user.service";
import { formatResponse } from "@utils/express";
import logger from "@utils/logger";
import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { create } from "superstruct";

const debugLog: debug.IDebugger = debug("server:user-controller");

class UserController {
	private static instance: UserController;

	static getInstance(): UserController {
		if (!UserController.instance) {
			UserController.instance = new UserController();
		}

		return UserController.instance;
	}

	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as CreateUserDto;
			const user = await userService.create(data);
			debugLog(user);
			const sessionId = await userService.createUserSession(user);
			res.setHeader("authorization", sessionId);
			return formatResponse({
				res,
				result: { done: true }
			});
		} catch (ex) {
			logger.error(ex.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
			return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
		}
	}

	async signinUser(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as SigninUserDto;
			const verifiedUser = await userService.verifyUserPassword(
				data.username,
				data.password
			);

			if (!verifiedUser) {
				return formatResponse({
					res,
					result: { verified: false },
					status: 403
				});
			}

			// TODO: check in DB first if sessionID exist, then only create new user session
			const sessionId = await userService.createUserSession(verifiedUser);
			res.setHeader("authorization", sessionId);
			return formatResponse({
				res,
				result: { verified: true }
			});
		} catch (ex) {
			logger.error(ex.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
			return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
		}
	}

	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const data = create(req.query, ReadUserStruct);
			const userList = await userService.getAllUsers(data);
			return formatResponse({
				res,
				result: userList
			});
		} catch (ex) {
			logger.error(ex.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
			return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
		}
	}

	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = create(req.params, ReadUserByIdStruct);

			const user = await userService.findUserById(userId);
			return formatResponse({
				res,
				result: user
			});
		} catch (ex) {
			logger.error(ex.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
			return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
		}
	}
}

export default UserController.getInstance();
