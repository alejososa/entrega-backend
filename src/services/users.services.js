import { usersManager } from "../persistencia/DAOs/managers/users/userManagerMonngo.js";

class UsersService {
    async createUser(user) {
        const newUser = await usersManager.create(user);
        return newUser;
    };

    async findUser(username) {
        const users = await usersManager.findUser(username);
        return users;
    };

    async updateUser(id, obj) {
        const users = await usersManager.updateUser(id, obj);
        return users;
    };

    async deleteUser(username) {
        const response = await usersManager.deleteUser(username);
        return response;
    };
};

export const usersService = new UsersService();