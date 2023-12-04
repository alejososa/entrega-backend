import  userModel  from "../../../db/models/users.model.js";

class UsersManagerMongo {
    async createUser(user) {
        try {
            const newUser = await userModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    }

    async findUser(username) {
        try {
            const user = await userModel.findOne(username)
            return user
        } catch (error) {
            return error
        }
    }

    async findUserById(id) {
        try {
            const user = await userModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async updateUser(id, obj) {
        try {
            const user = await userModel.updateOne(id, obj)
            return user
        } catch (error) {
            return error
        }
    }

    async deleteUser(username) {
        try {
            const user = await userModel.findOneAndDelete({username})
            return user
        } catch (error) {
            return error
        }
    }
}

export const usersManager = new UsersManagerMongo