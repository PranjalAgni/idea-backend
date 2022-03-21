// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
	allowEmptyValues: true
});
require("module-alias/register");
import config from "@config/index";
import debug from "debug";
import "reflect-metadata";
import initalizeApp from "./app";
import {
	initializeTransactionalContext,
	patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

const startServer = async () => {
	initializeTransactionalContext();
	patchTypeORMRepositoryWithBaseRepository();

	const debugLog: debug.IDebugger = debug("server");

	const app = await initalizeApp();

	app.listen(config.port, () => {
		debugLog(
			`Server running at http://localhost:${config.port} in ${config.env} mode`
		);
	});
};

startServer();
