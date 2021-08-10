/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@auth/(.*)": "<rootDir>/src/modules/auth/$1",
		"^@common/(.*)": "<rootDir>/src/modules/common/$1",
		"^@user/(.*)": "<rootDir>/src/modules/user/$1",
		"^@entities/(.*)": "<rootDir>/src/entities/$1",
		"^@config/(.*)": "<rootDir>/src/config/$1",
		"^@utils/(.*)": "<rootDir>/src/utils/$1"
	}
};
