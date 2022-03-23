// Infrastructure/Repositories/BaseRepository.ts
import { EntityManager, getManager } from "typeorm";
import { getNamespace } from "cls-hooked";
import config from "@config/index";

// export const patchRepositoryManager = (repositoryType: any) => {
// 	// eslint-disable-next-line no-console
// 	console.log(
// 		`Transactional@patchRepositoryManager repositoryType: ${repositoryType?.constructor?.name}`
// 	);
// 	Object.defineProperty(repositoryType, "manager", {
// 		get() {
// 			return getEntityManagerOrTransactionManager(
// 				this._connectionName,
// 				this._manager
// 			);
// 		},
// 		set(manager: EntityManager | undefined) {
// 			this._manager = manager;
// 			this._connectionName = manager?.connection?.name;
// 		}
// 	});
// };

export abstract class BaseDAO {
	protected get EntityManager(): EntityManager {
		const context = getNamespace(config.namespace.transaction);
		if (context && context.active) {
			const transactionalEntityManager = context.get(
				config.namespace.transactionEntityManager
			);

			if (transactionalEntityManager) {
				// At this point here we have successfully found a transactional EntityManager
				// that was previously saved within the current context.

				// We now use this EntityManager to work.
				return transactionalEntityManager;
			}
		}

		// No specific transactional EntityManager has been found : we use the global EntityManager to work.
		return getManager();
	}
}
