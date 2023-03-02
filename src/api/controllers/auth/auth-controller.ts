import { Response } from 'express'
import { JsonController, Post, Body, Res, OnUndefined } from 'routing-controllers'

import { OK, Created, ConflictError, NotFoundError, UnauthorizedError  } from '../../helpers'
import { add, save, findByEmail } from '../../services/user/user-service'
import { UserModel } from '../../../database/models/user-model'
import { createUserDto, loginUserDto } from '../../interfaces/user'
import { compare, hash } from '../../utils/encrypter'
import { createToken } from '../../utils/token-creator'

@JsonController('/auth')
export class AuthController {
 private userModel = new UserModel()

    @Post('/signUp')
    @OnUndefined(400)
    async signUp(@Body() request_body: createUserDto, @Res() response: Response) {
        let existing_user = await findByEmail(request_body.email)
        if(existing_user) return response.status(409).send(ConflictError('There is already a user using this email'))
        let usertoCreate = Object.assign(this.userModel, request_body)
        const hashedPassword = await hash(usertoCreate.password)
        Object.assign(usertoCreate, { password: hashedPassword})
        let new_user = await add(usertoCreate)
        const token = await createToken(new_user.id)
        new_user.token = token
        await save(new_user)
        return response.status(201).send(Created({ acess_token: token}))
    }

    @Post('/signIn')
    @OnUndefined(400)
    async signIn(@Body() request_body: loginUserDto, @Res() response: Response) {
        let existing_user = await findByEmail(request_body.email)
        if(!existing_user) return response.status(404).send(NotFoundError('No users found with this email'))

        const requestPassword = request_body.password
        const hashedPassword = existing_user.password
        const isCorrectPassword = await compare(requestPassword, hashedPassword)

        if(!isCorrectPassword)  return response.status(401).send(UnauthorizedError('Incorrect password'))

        const token = await createToken(existing_user.id)
        existing_user.token = token
        await save(existing_user)
        return response.status(200).send(OK({ acess_token: token}))
    }
}