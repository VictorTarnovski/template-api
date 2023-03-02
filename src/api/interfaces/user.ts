import { IsEmail, IsString } from "class-validator";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    token?: string
}

export class createUserDto {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}

export class loginUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}