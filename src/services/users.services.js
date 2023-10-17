import { response } from "express";
import { usersManager } from "../persistencia/DAOs/managers/users/userManager.js";
import UsersDto from "../persistencia/DTOs/user.dtos.js";
import { hashData } from "../utils.js";


class UserServices {
    async findUser(username) {
        const response = await usersManager.findUser(username)
        return response
    }
    async findById(id) {
        const response = await usersManager.findUserById(id)
        if (!response) {
            throw new error("Id not registered")
        }
        return response
    }
    async createOne(obj) {
        const hashPassword = await hashData(obj.password)
        if (!hashPassword) throw new error("Password cant be hashed");
        const userDto = new UsersDto({ ...obj, password: hashPassword });
        const response = await usersManager.create(userDto);
        return response
    }

    async deleteOne(username) {
        const response = await usersManager.deleteUser(username);
        return response;
    }
}

export const usersService = new UserServices();