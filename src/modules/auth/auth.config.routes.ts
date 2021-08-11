import { CommonRoutesConfig } from "@common/common.routes.config";
import userController from "@user/controllers/user.controller";
import debug from "debug";
import express from "express";
import userMiddleware from "@user/middlewares/user.middleware";

const debugLog: debug.IDebugger = debug("server:auth-routes");

export class AuthRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "AuthRoutes");
	}

	configureRoutes(): express.Application {
		this.app
			.route("/auth/signup")
			.post([userMiddleware.validateCreateUserBody, userController.createUser]);

		this.app
			.route("/auth/signin")
			.post([userMiddleware.validateSigninUserBody, userController.signinUser]);

		return this.app;
	}
}
