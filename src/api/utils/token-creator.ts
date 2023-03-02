import { sign } from 'jsonwebtoken'

export const createToken = async(userId: string): Promise<string> => {
    const token = sign({sub: userId}, 'secret')
    return token
}