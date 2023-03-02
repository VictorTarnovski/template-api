import { User, createUserDto } from "../user";

export interface userService {
    add(user: createUserDto): Promise<User>

    findByEmail(email: string): Promise<User>
}