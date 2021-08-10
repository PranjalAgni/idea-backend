import userService from "@user/services/user.service";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import httpErrors from "../../common/exceptions/HttpErrors";

class AuthMiddleware {
	private static instance: AuthMiddleware;

	static getInstance() {
		if (!AuthMiddleware.instance) {
			AuthMiddleware.instance = new AuthMiddleware();
		}
		return AuthMiddleware.instance;
	}

	async isAuth(req: Request, res: Response, next: NextFunction) {
		try {
			logger.info(`Inside auth interceptor for url ${req.originalUrl}`);
			const authHeader = req.headers["authorization"];
			let token = null;
			if (authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7, authHeader.length);
			}

			if (!token) {
				return httpErrors.userNotAuthenticated(res, next);
			}

			logger.info(`Extracted token: ${token}`);

			const user = await userService.getUserBySessionId(token);

			if (!user) {
				logger.error("No user found");
				return httpErrors.userNotAuthenticated(res, next);
			}

			logger.info("User fetched, attaching it to request object");
			req.user = user;
			return next();
		} catch (error) {
			logger.error(error.message);
			return httpErrors.userNotAuthenticated(res, next);
		}
	}
}

export default AuthMiddleware.getInstance();
