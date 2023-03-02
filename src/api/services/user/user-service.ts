import { User, createUserDto } from "../../interfaces/user";
import { financesDataSource } from '../../../database/data-source'
import { UserModel } from "../../../database/models/user-model";

let userRepo = financesDataSource.getRepository(UserModel)

    export const add = async (new_user: createUserDto): Promise<User> => {
        const user = await userRepo.save(new_user)
        return user
    }

    export const save = async (user: User): Promise<void> => {
        await userRepo.save(user)
        return 
    }

    export const findByEmail = async (email: string): Promise<User | null> => {
        const user = await userRepo.findOne({ where: { email: email } })
        return user
    }