import { IUser } from "interfaces/user.interface";
import { RegisterUserDto } from "./user.dto";
import User from "./user.model";

class UserRepo {
    public async getAll() {
        return User.findAll();
    }

    public async getByUsername(username: string): Promise<IUser> {
        return User.findOne({
            where: {
                username,
            },
            raw: true,
        });
    }

    public async create(data: RegisterUserDto) {
        return User.create(
            {
                ...data,
            },
            {
                returning: true,
                raw: true,
            }
        );
    }
}

export default UserRepo;
