import { NextFunction, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import createError from "http-errors";
import logger from "@utils/logger";

class HttpErrors {
	private static instance: HttpErrors;

	static getInstance() {
		if (!HttpErrors.instance) {
			HttpErrors.instance = new HttpErrors();
		}
		return HttpErrors.instance;
	}

	handleError(error: Error, res: Response, next: NextFunction) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		next(createError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
	}

	unprocessableEntityError(
		error: Error,
		res: Response,
		next: NextFunction
	): void {
		logger.error(error);
		res.status(StatusCodes.UNPROCESSABLE_ENTITY);
		next(createError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
	}

	userNotAuthenticated(res: Response, next: NextFunction): void {
		logger.error("User not authenitcated, going to return 401");
		res.status(StatusCodes.UNAUTHORIZED);
		next(
			createError(
				StatusCodes.UNAUTHORIZED,
				getReasonPhrase(StatusCodes.UNAUTHORIZED)
			)
		);
	}
}

export default HttpErrors.getInstance();
