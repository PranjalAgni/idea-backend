import { Image } from "@entities/Image";
import { User } from "@entities/User";
import { UserGithub } from "@entities/UserGithub";
import userDao from "@user/daos/user.dao";
import {
	CreateGithubUserDto,
	CreateUserDto,
	ReadUserDto
} from "@user/dtos/user.dto";
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

	async create(userData: CreateUserDto): Promise<User> {
		const user = userData as User;
		user.password = await hashPassword(user.password);
		return await userDao.create(user);
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

	async createGithubUser({
		id,
		accessToken,
		refreshToken,
		username,
		_json
	}: CreateGithubUserDto) {
		const profileJSON = _json;

		// check if this github user, has already signed up
		const githubUser = await userDao.getGithubUserById(parseInt(id));

		if (githubUser) return githubUser;

		// this is a new user, so add it to DB
		logger.info("This is a new Github user, creating a new user now");

		const avatar = {
			url: profileJSON.avatar_url as string
		} as Image;

		const userData = {
			username,
			bio: profileJSON.bio as string,
			avatar
		} as User;

		// create a User
		const user = await userDao.create(userData);

		const githubUserData = {
			githubId: parseInt(id),
			accessToken,
			refreshToken,
			user
		} as UserGithub;

		return await userDao.createGithubUser(githubUserData);
	}
}

export default UserService.getInstance();
