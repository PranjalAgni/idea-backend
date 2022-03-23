// import { Transaction } from "@common/decorators/Transaction";
import { User } from "@entities/User";
import userDao from "@user/daos/user.dao";
import { CreateUserDto, ReadUserDto } from "@user/dtos/user.dto";
import logger from "@utils/logger";
import { comparePassword, hashPassword } from "@utils/password";

class UserService {
	private static instance: UserService;

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	async createUser(userData: CreateUserDto): Promise<User> {
		const user = userData as User;
		logger.info(user);
		user.password = await hashPassword(user.password);
		await userDao.createUser(user);
		user.username = "netflix@chill.com";
		throw new Error("Please rollback and not store anything please...");
		return await userDao.createUser(user);
	}

	async verifyUserPassword(
		username: string,
		password: string
	): Promise<User | null> {
		const user = await userDao.findByUsername(username);
		if (!user) {
			logger.info(`User does not exist with ${username}`);
			return null;
		}
		if (!comparePassword(user.password, password)) {
			logger.info("Wrong password provided");
			return null;
		}

		logger.info(`User verified ${username}`);
		return user;
	}

	async getAllUsers(userData: ReadUserDto) {
		let usersList: Array<User> | null = null;
		if (userData.sortBy === "popular") {
			usersList = await userDao.getUsersOrderedByPopularity(
				userData.page,
				userData.limit
			);
		} else {
			usersList = await userDao.getUsersOrderedByRecentProject(
				userData.page,
				userData.limit
			);
		}

		return usersList;
	}

	async findUserById(userId: number) {
		return await userDao.findOne(userId);
	}

	async getUserBySessionId(sessionId: string): Promise<User> {
		const authToken = await userDao.getUserBySessionId(sessionId);
		return authToken.user;
	}

	async createUserSession(user: User): Promise<string> {
		const authToken = await userDao.createUserAuthToken(user);
		return authToken.sessionId;
	}
}

export default UserService.getInstance();
